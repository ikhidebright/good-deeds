import { Roles } from '../models/roles.model'
var _ = require('lodash');

export default function (permit) {
    try {
    return async function (request, response, next) {
    let role = await Roles.findOne({ _id: request.user.role._id })
    const permissions = role.permission
    const hasPermit = _.includes(permissions, permit)
    if (!hasPermit) {
        return response.status(401).send("Unauthorized access!")
    }
    request.user = request.user
    next()
    return
     }
    } catch (error) {
        return response.status(401).send("Invalid/expired Token")
    } 
}