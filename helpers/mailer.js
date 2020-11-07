import dotenv from "dotenv";
const ejs = require("ejs");
dotenv.config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function (options) {
    try {
        let { mail, subject, variables, email } = options
        ejs.renderFile(__dirname + email, variables, async function (err, data) {
            if (err) {
                console.log(err);
            } else {
                const msg = {
                    to: mail,
                    from: 'ikhidebright@gmail.com',
                    subject: subject,
                    html: data,
                }
                    await sgMail.send(msg)
              }
          })
        } catch (error) {
            console.log(error)
        } 
}