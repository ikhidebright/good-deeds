import { User } from '../models/user.model'
import createError from "http-errors";
import Encrypt from '../helpers/encrypt'
import { authSchema, emailSchema, passwordSchema, randomMailchema } from '../helpers/validateForm'
import Token from '../helpers/token'
const { hashPassword, comparePassword } = Encrypt
const { createToken, verifyToken } = Token
import Mail from '../helpers/mailer'

export default class Auth {
   static async register (request, response, next) {
       try {
            const result = await authSchema.validateAsync(request.body)
            const userExist = await User.findOne({ email: result.email })
            if (userExist) {
                throw createError.Conflict(`${result.email} is already in use`);
            } 
            result.password = hashPassword(result.password)
            let user = new User(result)
            let data = await user.save()
            let token = createToken(data._id)
            let link = `http://localhost:3000/confirm-account/${token}`
            const options = {
                mail: result.email,
                subject: 'Welcome to Good Deeds!, confirm your email',
                email: '../email/welcome.ejs',
                variables: { name: result.name, link: link }
            }
            await Mail(options)
            return response
            .status(200)
            .send(`Confirm your email on the link sent to ${result.email}`)
            } catch (error) {
             if (error.isJoi === true) error.status = 422;
             next(error)
            }
        }
    static async login (request, response, next) {
        try {
        const user = await User.findOne({ email: request.body.email })
        if (!user) {
            throw createError.Conflict(`Account doesn't exist`);
        }
        if (user.blocked) {
            throw createError.Conflict(`Account with email: ${result.email} has been blocked, contact Administrator`);
        }
        if (!user.emailConfirm) {
            throw createError.Conflict(`Please confirm you email: ${result.email} before you can login`);
        }
        const passwordMatch = comparePassword(request.body, user.password)
        if (passwordMatch) {
            const token = createToken(user)
            return response
            .status(200)
            .send(token)
        } else {
            throw createError.Unauthorized("Email/password not valid");
          }
        } catch (error) {
            return next(createError.BadRequest("Invalid Email/password"));
        }
        }
    static async confirmEmail (request, response, next) {
        try {
            const { token } = request.params
            const decode = verifyToken(token)
            const user = await User.findOne({ _id: decode})
            if (!user) {
                throw createError.BadRequest(`Account doesn't exist`);
            }
            if (user.blocked) {
                throw createError.Unauthorized(`Account with email: ${user.email} has been blocked, contact Administrator`);
            }
            await User.findByIdAndUpdate({_id: decode.id}, { emailConfirm: true })
            return response.status(200).send("Account Activated succesfully!!")
            } catch (error) {
              next(error);
            }
        }
    static async forgotPassword (request, response, next) {
        try {
            const result = await emailSchema.validateAsync(request.body)
            const user = await User.findOne({ email: result.email })
            if (!user) {
                throw createError.BadRequest(`Account doesn't exist`);
            }
            if (user.blocked) {
                throw createError.Unauthorized(`Account with email: ${result.email} has been blocked, contact Administrator`);
            }
            const token = createToken(user)
            const link = `http://localhost:3000/pass-reset/${token}/${user._id}`
            const options = {
                mail: result.email,
                subject: 'Password reset!',
                email: '../email/forgotPassword.ejs',
                variables: { name: user.name, link: link }
            }
            await Mail(options)
            return response
            .status(200)
            .send(`A Password reset link was sent to ${user.email}`)
            } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error)
            }
        }
    static async resendEmailConfirm (request, response, next) {
        try {
            const result = await emailSchema.validateAsync(request.body)
            const user = await User.findOne({ email: result.email })
            if (!user) {
                throw createError.BadRequest(`Account doesn't exist`);
            }
            if (user.blocked) {
                throw createError.Unauthorized(`Account with email: ${result.email} has been blocked, contact Administrator`);
            }
            const token = createToken(user._id)
            const link = `http://localhost:3000/confirm-account/${token}`
            const options = {
                mail: result.email,
                subject: 'Confirm your email',
                email: '../email/welcome.ejs',
                variables: { name: user.name, link: link }
            }
            await Mail(options)
            return response
            .status(200)
            .send(`Confirm your email on the link sent to ${result.email}`)
            } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error)
            }
        }
    static async passwordReset (request, response, next) {
        try {
        const result = await passwordSchema.validateAsync(request.body)
        const { token, id } = request.params
        const user = await User.findOne({ _id: id })
        if (!user) {
            throw createError.BadRequest(`Account doesn't exist`);
        }
        if (user.blocked) {
            throw createError.Unauthorized(`Account with email: ${result.email} has been blocked, contact Administrator`);
        }
        verifyToken(token)
        user.password = hashPassword(result.password)
        await user.save()
        return response
            .status(200)
            .send("Password Changed!! Login Now")
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error)
        } 
        }
        static async usersMe (request, response, next) {
            try {
            const user = verifyToken()
            } catch (error) {
                if (error.isJoi === true) error.status = 422;
                next(error)
            } 
        }
        static async randomMailer (request, response, next) {
            try {
                const result = await randomMailchema.validateAsync(request.body)
                let token = request.headers['x-access-token'] || request.headers['authorization'];
                if (!token) {
                throw createError.Unauthorized(`Unauthorized`);
                }

                if (token === process.env.randomMailer) {
                    const html = `
                    Name: ${result.name}
                    <br>
                    Email: ${result.email}
                    <br>
                    Phone: ${result.phone}
                    <br>
                    Date: ${result.date}
                    <br>
                    Subject: ${result.subject}
                    <br><br><br>
                    Message: ${result.message}
                    `
                    const options = {
                        mail: result.myMail,
                        subject: `Message from ${result.name}`,
                        email: '../email/general.ejs',
                        variables: { message: html }
                    }
                    await Mail(options)
                    return response
                    .status(200)
                    .send(`Sucessful!`)
                }
                throw createError.Unauthorized(`Unauthorized`);
            } catch (error) {
                if (error.isJoi === true) error.status = 422;
                next(error)
            } 
        }
}