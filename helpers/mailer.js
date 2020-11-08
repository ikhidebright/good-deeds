import dotenv from "dotenv";
const ejs = require("ejs");
import createError from "http-errors";
dotenv.config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function (options) {
    try {
        let { mail, subject, variables, email } = options
        const data = await ejs.renderFile(__dirname + email, variables, { async: true })
                const msg = {
                    to: mail,
                    from: 'ikhidebright@gmail.com',
                    subject: subject,
                    html: data,
                }
                    await sgMail.send(msg)
        } catch (error) {
            console.log("error", error)
            throw createError.Conflict(`Request was succesfull, but an Error occured sending confirmation mail`);
        } 
}