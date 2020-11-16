import { Roles } from '../models/roles.model'
import createError from "http-errors";
import { roleSchema } from '../helpers/validateForm'

export default class Role {
    static async createRole (request, response, next) {
        try {
             const result = await roleSchema.validateAsync(request.body)
             const roleExist = await Roles.findOne({ name: result.name })
             if (roleExist) {
                throw createError.Conflict(`${result.name} role is already available`);
            } 
             let roleData = {
                 name: result.name,
                 permission: result.permission,
                 description: result.description,
                 CreadtedBy: request.user._id
             }
             let role = new Roles(roleData)
             await role.save()
             return response
             .status(200)
             .send(`Sucessful!`)
             } catch (error) {
              if (error.isJoi === true) error.status = 422;
              next(error)
             }
         }
     static async getRoles (request, response, next) {
         try {
         const role = await Roles
         .find({})
         if (!role) {
             throw createError.Conflict(`No Role exist`);
         }
             return response
             .status(200)
             .send(role)
         } catch (error) {
             next(error)
         }
         }
     static async editRole (request, response, next) {
         try {
             const result = await roleSchema.validateAsync(request.body)
             const { id } = request.params
             const role = await Roles.findOne({ _id: id })
             if (!role) {
                 throw createError.BadRequest(`role doesn't exist`);
             }
             if (role.name == 'administrator' || role.name == 'user') {
                 throw createError.Conflict(`Sorry You cannot edit this role`);
             }
             if (result.name) role.name = result.name
             if (result.permission) role.permission = result.permission
             if (result.description) role.description = result.description
             role.ModifiedBy = request.user._id
             await Roles.findByIdAndUpdate({_id: role.id}, role)
             return response.status(200).send("Updated succesfully!!")
             } catch (error) {
               next(error);
             }
         }
     static async deleteRole (request, response, next) {
         try {
             const { id } = request.params
             const role = await Roles.findOne({ _id: id })
             if (!role) {
                 throw createError.BadRequest(`role doesn't exist`);
             }
             if (role.name == 'administrator' || role.name == 'user') {
                 throw createError.Conflict(`Sorry You cannot delete this role`);
             }
             await Roles.deleteOne({ _id: id })
             return response
             .status(200)
             .send(`Role Deleted!`)
             } catch (error) {
             if (error.isJoi === true) error.status = 422;
             next(error)
             }
         }
     static async getRole (request, response, next) {
         try {
             const { id } = request.params
             let role = await Roles
                                 .findOne({ _id: id }, { __v: 0 })
                                 .populate({
                                     path: 'CreadtedBy',
                                     select: 'name email _id'
                         })
             if (!role) {
                 throw createError.BadRequest(`role doesn't exist`);
             }
             return response
             .status(200)
             .send(role)
             } catch (error) {
             if (error.isJoi === true) error.status = 422;
             next(error)
             }
         }
 }