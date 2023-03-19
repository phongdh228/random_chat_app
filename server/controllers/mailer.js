import nodemailer from 'nodemailer';
import MailGen from 'mailgen';

import ENV from '../config.js';

let nodeConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD,
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new MailGen({
    theme: 'default',
    product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

export const registerMail = async (req,res) =>{
    const {username, userEmail, text, subject} = req.body;

    var email = {
        body: {
            name: username,
            intro: text ||"Welcome to Daily Tuition",
            outro: "Need help?" 
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successfully",
        html: emailBody,
    }

    //send mail
    transporter.sendMail(message)
    .then(() => {
        return res.status(200).send({msg: "You should receiving an email from us."})
    })
    .catch(error => res.status(500).send({error}));
}