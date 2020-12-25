import createError from "http-errors";
import { Deed } from "../models/deeds.model";
import { deedSchema, approvalSchema } from "../helpers/validateForm";
import Mail from "../helpers/mailer";

export default class Deeds {
  static async createDeed(request, response, next) {
    try {
      const result = await deedSchema.validateAsync(request.body);
      let deedData = {
        deed: result.deed,
        location: result.location,
        date: result.date,
        description: result.description,
        CreadtedBy: request.user._id,
      };
      let deed = new Deed(deedData);
      await deed.save();
      return response.status(200).send(`Deed Posted!, waiting approval`);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  }
  static async getDeeds(request, response, next) {
    try {
      const deed = await Deed.find({});
      if (!deed) {
        throw createError.Conflict(`No deed exist`);
      }
      return response.status(200).send(deed);
    } catch (error) {
      next(error);
    }
  }
  static async editDeed(request, response, next) {
    try {
      const result = await emailSchema.validateAsync(request.body);
      const { id } = request.params;
      const deed = await Deed.findOne({ _id: id });
      if (!deed) {
        throw createError.BadRequest(`Deed doesn't exist`);
      }
      if (deed.approved !== null) {
        throw createError.Conflict(
          `Sorry You cannot edit deed when its approved/disapproved`
        );
      }
      if (result.name) deed.name = result.name;
      if (result.location) deed.location = result.location;
      if (result.date) deed.date = result.date;
      if (result.description) deed.description = result.description;
      deed.ModifiedBy = request.user._id;
      await User.findByIdAndUpdate({ _id: deed.id }, deed);
      return response.status(200).send("Account Activated succesfully!!");
    } catch (error) {
      next(error);
    }
  }
  static async deleteDeed(request, response, next) {
    try {
      const { id } = request.params;
      const deed = await Deed.findOne({ _id: id });
      if (!deed) {
        throw createError.BadRequest(`Deed doesn't exist`);
      }
      if (deed.approved && request.user.role !== "administrator") {
        throw createError.Conflict(
          `Sorry You cannot delete deed when its approved`
        );
      }
      await Deed.deleteOne({ _id: id });
      return response.status(200).send(`Deed Deleted!`);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  }
  static async getDeed(request, response, next) {
    try {
      const { id } = request.params;
      let deed = await Deed.findOne({ _id: id }, { __v: 0 }).populate({
        path: "CreadtedBy",
        select: "name email _id",
      });
      if (!deed) {
        throw createError.BadRequest(`Deed doesn't exist`);
      }
      return response.status(200).send(deed);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  }
  static async approveDeed(request, response, next) {
    try {
      const result = await approvalSchema.validateAsync(request.body);
      const { id } = request.params;
      const deed = await Deed.findOne({ _id: id }).populate({
        path: "CreadtedBy",
      });
      if (!deed) {
        throw createError.BadRequest(`Deed doesn't exist`);
      }
      if (deed.approved && result.approved && deed.approved !== null) {
        throw createError.BadRequest(`Sorry Deed is already approved`);
      }
      if (!deed.approved && !result.approved && deed.approved !== null) {
        throw createError.BadRequest(
          `Sorry Deed is already blocked/unapproved`
        );
      }
      deed.approved = result.approved;
      const posterEmail = deed.CreadtedBy.email;
      await deed.save();
      if (deed.approved) {
        const options = {
          mail: posterEmail,
          subject: "YAY! Deed approved!",
          email: "../email/welcome.ejs",
          variables: { name: "Bright", link: "link" },
        };
        await Mail(options);
        return response.status(200).send("Deed was approved!");
      } else {
        const options = {
          mail: posterEmail,
          subject: "Sorry, Deed disapproved!",
          email: "../email/welcome.ejs",
          variables: { name: "Bright", link: "link" },
        };
        await Mail(options);
        return response.status(200).send("Deed was disapproved");
      }
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  }
}
