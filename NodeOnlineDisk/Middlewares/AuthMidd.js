const { MemberModel } = require('../Models/MemberModel');


const CheckUsername = async (req, res, next) => {
    const { username } = req.body;
    const result = await MemberModel.FindMember(username);
    if (result.length) res.status(200).json({ err: "This username alredy exist !" });
    next();
};

module.exports = { CheckUsername };