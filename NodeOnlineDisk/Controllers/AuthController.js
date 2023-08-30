const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { MemberModel } = require('../Models/MemberModel');
const { FoldersModel } = require('../Models/FoldersModel');

const register = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const data = req.body;
        const maiFolder = { name: 'Home', member: data.username, path: 'Home/', content: [] };
        const hashing_password = await bcrypt.hash(data.password, 10);
        await MemberModel.InsertData(db, { ...data, password: hashing_password });
        await FoldersModel.InsertData(db, maiFolder);
        res.status(200).json({ nextPage: `/email_verify/${data.username}` });
    } catch (error) {
        console.log(`The error from AuthController.js in register: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    };
};

const UserIsExist = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const username = req.params.username;
        const result = await MemberModel.GetData(db, { username });
        res.status(200).json({ check: result.length });
    } catch (error) {
        console.log(`The error from AuthController.js in UserIsExist: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    }
};

const SendEmailVerification = async (req, res) => {
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
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    outline: none;
                }
                body {
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                #verify {
                    width: 70%;
                    height: 60%;
                    padding: 20px;
                    border-radius: 10px;
                    border: 2px solid;
                    text-align: center;
                }
                #verify h2 {
                    margin-bottom: 20px;
                }
                #verify > div:last-child > #firstMess {
                    margin-bottom: 30px;
                }
              </style>
            </head>
            <body>
              <div id="verify">
                <h2>Click in the link for verify you email .</h2>
                <div>
                    <p id='firstMess'>Thank you for signing up with our service! We're excited to have you on board. To ensure the security of your account and start enjoying our features, we need to verify your email address.</p>
                    <p>
                        Please click on the following link to verify your email:
                        <a href='http://localhost:3500/auth/EmailVerification/${username}'>Virify email</a>
                    </p>
                </div>
              </div>
            </body>
            </html>
        `;

        const Transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure: true,
            auth: {
                user: "brahimazirar59@gmail.com",
                pass: "qwcqcpfcdhnmslbs"
            }
        });

        await Transporter.sendMail({
            from: 'brahimazirar59@gmail.com',
            to: email,
            subject: 'Online Disk | Email verfication',
            html: HTML
        });
    } catch (error) {
        console.log(`The error from AuthController.js in SendEmailVerification: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    };
};

const EmailVerification = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const username = req.params.username;
        await MemberModel.UpdateData(db, { username }, { $set: { email_verfy: true } });
        const data = await MemberModel.GetData(db, { username }, { projection: { password: 0, email_verfy: 0 } });
        req.session.user = { isAuth: true, user_data: data[0] };
        res.redirect(`http://localhost:3000/Member/Account/${username}`);
    } catch (error) {
        console.log(`The error from AuthController.js in EmailVerification: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    };
};

const IsAuth = (req, res) => {
    try {
        if (req.session.user.isAuth) res.status(200)
            .json({ response: true, user: req.session.user.user_data });
        else res.status(200).json({ response: false });
    } catch (error) {
        console.log(`The error from AuthController.js in IsAuth: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    };
};

const login = async (req, res) => {
    try {
        const { db } = req.app.locals;
        let object, logIn = false;

        if (req.Target === 'username') object = { username: req.body.UserName_Email};
        else object = { email: req.body.UserName_Email};

        const result = await MemberModel.GetData(db, object);
        for (let ele of result) {
            if (await bcrypt.compare(req.body.password, ele.password)) {
                logIn = ele; delete logIn.password; delete logIn.email_verfy;
                break;
            };
        };

        if (logIn) {
            req.session.user = { isAuth: true, user_data: logIn };
            res.status(200).json({ response: true, nextPage: `/Member/Account/${logIn.username}` });
        } else {
            res.status(200).json({ response: false });
        };
    } catch (error) {
        console.log(`The error from AuthController.js in login: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    };
};

const emailIsExist = async (req, res) => {
    try {
        const { db } = req.app.locals;
        const email = req.params.email;
        const result = await MemberModel.GetData(db, { email });
        console.log(result);
    } catch (error) {
        console.log(`The error from AuthController.js in emailIsExist: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    };
};

const LogOut = (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) throw new Error(err);
        });
        res.status(200).json({ response: true });
    } catch (error) {
        console.log(`The error from AuthController.js in LogOut: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    }
}

module.exports = { 
    register, UserIsExist, SendEmailVerification, EmailVerification, IsAuth, login, emailIsExist, LogOut
};