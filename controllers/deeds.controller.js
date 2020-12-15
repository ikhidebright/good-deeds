import { Deed } from '../models/deeds.model'
import client from '../config/client'
const { clientUrl, api, deeds_end_point } = client
import createError from "http-errors";
import { deedSchema,
         approvalSchema } from '../helpers/validateForm'
import Mail from '../helpers/mailer'
import _ from 'lodash'

export default class Deeds {
   static async createDeed (request, response, next) {
       try {
            const result = await deedSchema.validateAsync(request.body)
            let deedData = {
                deed: result.deed,
                location: result.location,
                date: result.date,
                name: result.name,
                description: result.description,
                CreadtedBy: request.user._id
            }
            let deed = new Deed(deedData)
            await deed.save()
            return response
            .status(200)
            .send(`Deed Posted!, waiting approval`)
            } catch (error) {
             if (error.isJoi === true) error.status = 422;
             next(error)
            }
        }
    static async getDeeds (request, response, next) {
        try {
            let { search, page } = request.query;
            page = !page || isNaN(page) ? 1 : Number(page)
            let nextPageUrl, prevPageUrl;
            const searchQueries = {
                $and: [
                    { approved: true },
                {
                    $or: [
                    {
                      deed: { $regex: new RegExp(search), $options: "i" }
                    },
                    {
                      date: { $regex: new RegExp(search), $options: "i" }
                    },
                    {
                      location: { $regex: new RegExp(search), $options: "i" }
                    }
                  ]
                }
            ]
            }
            page = page < 1 ? 1 : Number(page);
            let limit = 5;
            let query = search ? searchQueries : { approved: true };
            // get total documents in the Products collection
            let count = await Deed.countDocuments(query);
            let totalPages = Math.ceil(count/limit);
            page = page > totalPages ? totalPages : page;
            let deeds = await Deed.find(query, { __v: 0 })
            .limit(limit * 1)
              .skip((page - 1) * limit)
              .populate({path: 'CreadtedBy', select: 'username email _id profilePic'})
              .sort({"CreatedDate": 1})
              .exec();
              // delete page query from url
              delete request.query.page
              // select only queries you want
              const searchQ = {
                search: request.query.search
              }
              let queryParamsFormatted = Object.entries(searchQ)
              // flatten the array of arrays
              let flattenedQueryArray = _.flattenDeep(queryParamsFormatted);
              // check if theres next result url
              let hasNextpage = totalPages - page
              // get next page number
              let nextPageNumber = Number(page) + 1
              // get  page number
              let prevPageNumber = Number(page) - 1
              // format next page url
              nextPageUrl = hasNextpage === 0? false : `${api}${deeds_end_point}?${flattenedQueryArray.join('=')}&page=${nextPageNumber}`
              // format prev page url
              prevPageUrl = page === 1? false : `${api}${deeds_end_point}?${flattenedQueryArray.join('=')}&page=${prevPageNumber}`
            // return response with deeds, total pages, and current page
            response.json({
              success: true,
              deeds,
              totalPages: totalPages,
              currentPage: page,
              totalDeeds: count,
              prevPageUrl: prevPageUrl,
              nextPageUrl: nextPageUrl,
            });
          } catch (error) {
            next(error)
          }
        }
    static async editDeed (request, response, next) {
        try {
            const result = await emailSchema.validateAsync(request.body)
            const { id } = request.params
            const deed = await Deed.findOne({ _id: id })
            if (!deed) {
                throw createError.BadRequest(`Deed doesn't exist`);
            }
            if (deed.approved !== null) {
                throw createError.Conflict(`Sorry You cannot edit deed when its approved/disapproved`);
            }
            if (result.name) deed.name = result.name
            if (result.location) deed.location = result.location
            if (result.date) deed.date = result.date
            if (result.description) deed.description = result.description
            deed.ModifiedBy = request.user._id
            await User.findByIdAndUpdate({_id: deed.id}, deed)
            return response.status(200).send("Account Activated succesfully!!")
            } catch (error) {
              next(error);
            }
        }
    static async deleteDeed (request, response, next) {
        try {
            const { id } = request.params
            const deed = await Deed.findOne({ _id: id })
            if (!deed) {
                throw createError.BadRequest(`Deed doesn't exist`);
            }
            if (deed.approved && request.user.role !== 'administrator') {
                throw createError.Conflict(`Sorry You cannot delete deed when its approved`);
            }
            await Deed.deleteOne({ _id: id })
            return response
            .status(200)
            .send(`Deed Deleted!`)
            } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error)
            }
        }
    static async getDeed (request, response, next) {
        try {
            const { id } = request.params
            let deed = await Deed
                                .findOne({ _id: id }, { __v: 0 })
                                .populate({
                                    path: 'CreadtedBy',
                                    select: 'name email _id'
                        })
            if (!deed) {
                throw createError.BadRequest(`Deed doesn't exist`);
            }
            return response
            .status(200)
            .send(deed)
            } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error)
            }
        }
    static async approveDeed (request, response, next) {
        try {
        const result = await approvalSchema.validateAsync(request.body)
        const { id } = request.params
        const deed = await Deed.findOne({ _id: id }).populate({ path: 'CreadtedBy' })
        if (!deed) {
            throw createError.BadRequest(`Deed doesn't exist`);
        }
        if (deed.approved && result.approved && deed.approved !== null) {
            throw createError.BadRequest(`Sorry Deed is already approved`);
        }
        if (!deed.approved && !result.approved && deed.approved !== null) {
            throw createError.BadRequest(`Sorry Deed is already blocked/unapproved`);
        }
        
        console.log(deed)
        deed.approved = result.approved
        deed.ModifiedBy = request.user._id
        let posterEmail = "ikhidebright@gmail.com"
        let link = `${clientUrl}deeds/add`
        let message = "Your Deed was Approved, thanks for the kindness"
        await deed.save()
        if (deed.approved) {
            const options = {
                mail: posterEmail,
                subject: 'YAY! Deed approved!',
                email: '../email/notify.html',
                variables: {
                    name: 'Bright', 
                    heading: "DEED APPROVED",
                    message: message,
                    link: link, 
                    buttonText: 'SUBMIT NEW DEED'
                }
            }
            await Mail(options)
            return response
                .status(200)
                .send("Deed was approved!")
        } else {
            let posterEmail = "ikhidebright@gmail.com"
            let link = `${clientUrl}deeds/add`
            message = "Your Deed was Disapproved, for reasons of being inappropriate or against our community standards. We hope you submit deeds soon!"
            const options = {
                mail: posterEmail,
                subject: 'Sorry, Deed disapproved!',
                email: '../email/notify.html',
                variables: {
                    name: 'Bright', 
                    heading: "DEED DISAPPROVED",
                    message: message,
                    link: link, 
                    buttonText: 'SUBMIT NEW DEED'
                }
            }
            await Mail(options)
            return response
                .status(200)
                .send("Deed was disapproved")
        }
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error)
        } 
        }
}