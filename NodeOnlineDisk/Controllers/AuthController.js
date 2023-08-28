const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { MemberModel } = require('../Models/MemberModel');

const register = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const data = req.body;
        const hashing_password = await bcrypt.hash(data.password, 10);
        await MemberModel.InsertData(db, { ...data, password: hashing_password });
        res.status(200).json({ nextPage: `/email_verify/${data.username}` });
    } catch (error) {
        console.log(`The error from AuthController.js: ${error.message}`);
    };
};

const UserIsExist = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const username = req.params.username;
        const result = await MemberModel.GetData(db, { username });
        res.status(200).json({ check: result.length });
    } catch (error) {
        console.log(`The error from AuthMiddleware.js: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    }
};

const SendEmailVerification = (req, res) => {
    try {
        const username = req.params.username;
        const email = req.targetEmail;
        const HTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>

              </style>
            </head>
            <body>
              <div id="verify">
                <h2>Click in the link for verify you email .</h2>
                <div>
                    <p>Thank you for signing up with our service! We're excited to have you on board. To ensure the security of your account and start enjoying our features, we need to verify your email address.</p>
                    <p>
                        Please click on the following link to verify your email:
                        <a href='http://localhost:3500/auth/EmailVerification/${username}'>Virify email</a>
                    </p>
                </div>
              </div>
            </body>
            </html>
        `;
    } catch (error) {
        console.log(`The error from AuthMiddleware.js: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    };
};

module.exports = { register, UserIsExist, SendEmailVerification };