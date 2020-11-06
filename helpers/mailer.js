import dotenv from "dotenv";
dotenv.config();

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function (mail, subject, message) {
    try {
        const msg = {
            to: mail,
            from: 'ikhidebright@gmail.com',
            subject: subject,
            html: message,
            }
            await sgMail.send(msg)
        } catch (error) {
            console.log(error)
        } 
}