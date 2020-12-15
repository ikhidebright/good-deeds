import { Deed } from '../models/deeds.model'
import { User } from '../models/user.model'
import client from '../config/client'
const { clientUrl, api, deeds_end_point } = client
import createError from "http-errors";
import _ from 'lodash'

export default class Deeds {
    static async getUserProfileDeed (request, response, next) {
        try {
            let { page } = request.query;
            let { username } = request.params;
            const user = await User.findOne({ username: username })
            const myProfile = request.user._id == user._id
            page = !page || isNaN(page) ? 1 : Number(page)
            // let nextPageUrl, prevPageUrl;
            let searchQueries = {
              CreadtedBy: user._id
          }
            if (!myProfile) {
              searchQueries.approved = true
          }
          page = page < 1 ? 1 : Number(page);
            let limit = 5;
            // let query = search ? searchQueries : {};
            // get total documents in the Products collection
            let count = await Deed.countDocuments(searchQueries);
            let totalPages = Math.ceil(count/limit);
            page = page > totalPages && totalPages != 0 ? totalPages : page;
            console.log("myProfile", page, myProfile, request.user._id, user._id)
            let deeds = await Deed.find(searchQueries, { __v: 0 })
              .limit(limit * 1)
              .skip((page - 1) * limit)
              .populate({path: 'CreadtedBy', select: 'username email _id profilePic'})
              .sort({"CreatedDate": 1})
              .exec();
              // delete page query from url
            //   delete request.query.page
            //   // select only queries you want
            //   const searchQ = {
            //     search: request.query.search
            //   }
            //   let queryParamsFormatted = Object.entries(searchQ)
            //   // flatten the array of arrays
            //   let flattenedQueryArray = _.flattenDeep(queryParamsFormatted);
            //   // check if theres next result url
            //   let hasNextpage = totalPages - page
            //   // get next page number
            //   let nextPageNumber = Number(page) + 1
            //   // get  page number
            //   let prevPageNumber = Number(page) - 1
            //   // format next page url
            //   nextPageUrl = hasNextpage === 0? false : `${api}${deeds_end_point}?${flattenedQueryArray.join('=')}&page=${nextPageNumber}`
            //   // format prev page url
            //   prevPageUrl = page === 1? false : `${api}${deeds_end_point}?${flattenedQueryArray.join('=')}&page=${prevPageNumber}`
            // // return response with deeds, total pages, and current page
            response.json({
              success: true,
              deeds,
            //   totalPages: totalPages,
            //   currentPage: page,
            //   totalDeeds: count,
            //   prevPageUrl: prevPageUrl,
            //   nextPageUrl: nextPageUrl,
            });
          } catch (error) {
            next(error)
          }
        }
}