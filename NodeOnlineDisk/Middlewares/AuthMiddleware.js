const { MemberModel } = require('../Models/MemberModel');

const UsernameIsExist = async (req, res, next) => {
    try {
        const { db } = req.app.locals;
        const username = req.body.username;
        const result = await MemberModel.GetData(db, { username });
        if (result.length) res.json({ err: 'This username already exist !!!' });
        else next();
    } catch (error) {
        console.log(`The error from AuthMiddleware.js: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    }
};

const GetUserEmail = async (req, res, next) => {
    try {
        const { db } = req.app.locals;
        const username = req.params.username;

        const email = await MemberModel.GetData(db, { username });
        req.targetEmail = email[0].email;
        next();
    } catch (error) {
        console.log(`The error from AuthMiddleware.js: ${error.message}`);
        res.json({ err: 'error in the server try later !!!' });
    };
};

module.exports = { UsernameIsExist, GetUserEmail };