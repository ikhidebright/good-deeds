import { User } from "../models/user.model";
import client from "../config/client";
const { clientUrl, api, users_end_point } = client;
import createError from "http-errors";
import { deedSchema, approvalSchema } from "../helpers/validateForm";
import Mail from "../helpers/mailer";
import _ from "lodash";

export default class Users {
  static async getUsers(request, response, next) {
    try {
      let { search, page } = request.query;
      page = !page || isNaN(page) ? 1 : Number(page);
      let nextPageUrl, prevPageUrl;
      const searchQueries = {
        $or: [
          {
            username: { $regex: new RegExp(search), $options: "i" },
          },
          {
            email: { $regex: new RegExp(search), $options: "i" },
          },
        ],
      };
      page = page < 1 ? 1 : Number(page);
      let limit = 2;
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
      if (!user) {
        throw createError.NotFound(`User not found`);
      }
      if (user.blocked) {
        throw createError.NotFound(`${username} has been blocked`);
      }
      if (!user.emailConfirm) {
        throw createError.NotFound(`User not found`);
      }
      return response.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}
