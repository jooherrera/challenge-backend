"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptionsToUser = exports.sendAdminMail = void 0;
const _Utils_1 = require("../utils/index.js");
const nodemailer_1 = require("nodemailer");
const Admintransporter = (0, nodemailer_1.createTransport)({
    host: process.env.HOSTMAILER,
    port: Number(process.env.PORTMAILER),
    secure: true,
    auth: {
        user: process.env.USERMAILER,
        pass: process.env.PASSMAILER,
    },
});
const sendAdminMail = async (mailOptions) => {
    try {
        await Admintransporter.sendMail(mailOptions);
        (0, _Utils_1.logMsg)('Mensaje enviado');
    }
    catch (error) {
        console.log(error);
        (0, _Utils_1.logError)('Problemas al enviar el mail');
    }
};
exports.sendAdminMail = sendAdminMail;
const mailOptionsToUser = (fromMail, fromName) => ({
    from: 'Jose Herrera',
    to: fromMail,
    subject: 'Jose Herrera',
    html: `
    <h3>Estimado/a ${fromName}</h3>
    <p>Muchas gracias por registrarse.</p>
    <br>
    <p>Saludos Cordiales.</p>
    <p><strong>José Herrera.</strong></p>
    `,
});
exports.mailOptionsToUser = mailOptionsToUser;
