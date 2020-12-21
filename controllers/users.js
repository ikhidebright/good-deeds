import { User } from "../models/user.model";
import client from "../config/client";
const { clientUrl, api, users_end_point } = client;
import createError from "http-errors";
import { bulkUserMailSchema } from "../helpers/validateForm";
import Mail from "../helpers/mailer";
import _ from "lodash";

export default class Users {
  static async getUsers(request, response, next) {
    try {
      let { search, page } = request.query;
      page = !page || isNaN(page) ? 1 : Number(page);
      let nextPageUrl, prevPageUrl;
      const searchQueries = {
        $and: [
          { emailConfirm: true },
          {
            $or: [
              {
                username: { $regex: new RegExp(search), $options: "i" },
              },
              {
                email: { $regex: new RegExp(search), $options: "i" },
              },
            ],
          },
        ],
      };
      page = page < 1 ? 1 : Number(page);
      let limit = 20;
      let query = search ? searchQueries : {};
      // get total documents in the Products collection
      let count = await User.countDocuments(query);
      let totalPages = Math.ceil(count / limit);
      page = page > totalPages ? totalPages : page;
      let users = await User.find(query, { __v: 0 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ CreatedDate: 1 })
        .exec();
      // delete page query from url
      delete request.query.page;
      // select only queries you want
      const searchQ = {
        search: request.query.search,
      };
      let queryParamsFormatted = Object.entries(searchQ);
      // flatten the array of arrays
      let flattenedQueryArray = _.flattenDeep(queryParamsFormatted);
      // check if theres next result url
      let hasNextpage = totalPages - page;
      // get next page number
      let nextPageNumber = Number(page) + 1;
      // get  page number
      let prevPageNumber = Number(page) - 1;
      // format next page url
      nextPageUrl =
        hasNextpage === 0
          ? false
          : `${api}${users_end_point}?${flattenedQueryArray.join(
              "="
            )}&page=${nextPageNumber}`;
      // format prev page url
      prevPageUrl =
        page === 1
          ? false
          : `${api}${users_end_point}?${flattenedQueryArray.join(
              "="
            )}&page=${prevPageNumber}`;
      // return response with deeds, total pages, and current page
      response.json({
        success: true,
        users,
        totalPages: totalPages,
        currentPage: page,
        totalUsers: count,
        prevPageUrl: prevPageUrl,
        nextPageUrl: nextPageUrl,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getUserByUsername(request, response, next) {
    try {
      let { username } = request.params;
      const user = await User.findOne({ username: username }).populate({
        path: "role",
        select: "name description _id",
      });
      const myProfile = request.user._id == user._id;
      if (!user) {
        throw createError.NotFound(`User not found`);
      }
      if (user.blocked) {
        throw createError.NotFound(`${username} has been blocked`);
      }
      if (!user.emailConfirm) {
        throw createError.NotFound(`User not found`);
      }
      let userToSend = {
        username: user.username,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        country: user.country,
        state: user.state,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        dob: user.dob,
        maritalStatus: user.maritalStatus,
        showBirthYear: user.showBirthYear,
        showAddress: user.showAddress,
        showGender: user.showGender,
        showMarital: user.showMarital,
        showPhone: user.showPhone,
        myProfile: myProfile,
        CreatedDate: user.CreatedDate,
      };
      if (!myProfile && !user.showGender && user.gender)
        delete userToSend.gender;
      if (!myProfile && !user.showMarital && user.maritalStatus)
        delete userToSend.maritalStatus;
      if (!myProfile && !user.showPhone && user.phoneNumber)
        delete userToSend.phoneNumber;
      if (!myProfile && !user.showAddress && user.address)
        delete userToSend.address;
      if (!myProfile && !user.showBirthYear && user.dob) delete userToSend.dob;
      return response.status(200).send(userToSend);
    } catch (error) {
      next(error);
    }
  }
  static async sendUsersMail(request, response, next) {
    try {
      const result = await bulkUserMailSchema.validateAsync(request.body);
      const { subject, userDetails, message } = result;
      console.log(userDetails);
      await userDetails.forEach(async (user) => {
        const options = {
          mail: user.email,
          subject: subject,
          email: "../email/bulkUserMail.html",
          variables: { username: user.username, message: message },
        };
        await Mail(options);
      });
      return response.status(200).send("Mail Successfully Sent!");
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  }
  static async editUser(request, response, next) {
    try {
      const result = await emailSchema.validateAsync(request.body);
      const { id } = request.params;
      const user = await User.findOne({ _id: id });
      if (!user) {
        throw createError.BadRequest(`User doesn't exist`);
      }
      if (result.username) user.username = result.username;
      if (result.email) user.email = result.email;
      if (result.role) user.role = result.role;
      if (result.blocked) user.blocked = result.blocked;
      if (result.profilePic) user.profilePic = result.profilePic;
      user.ModifiedBy = request.user._id;
      await User.findByIdAndUpdate({ _id: user.id }, user);
      return response.status(200).send("User updated succesfully!!");
    } catch (error) {
      next(error);
    }
  }
  static async blockUser(request, response, next) {
    try {
      const { id } = request.params;
      const user = await User.findOne({ _id: id });
      let blockValue = !user.blocked;
      const userSaved = await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: { blocked: blockValue },
        },
        {
          new: true,
        }
      );
      return response.status(200).send(userSaved);
    } catch (error) {
      next(error);
    }
  }
}
