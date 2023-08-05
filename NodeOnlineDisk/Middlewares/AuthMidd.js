const AuthModel = require("../Models/AuthModel");

const CheckUsername = (req, res, next) => {
    console.log(req.body);
    // const { username} = req.body;
    // const data = AuthModel.FindMember(username);
    // res.status(200).json(data);
    next();
};

module.exports = { CheckUsername };