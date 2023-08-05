const connection = require("../server");
const dbname = "OnlineDisk";
const MemberCollection = async () => await connection.db(dbname).collection("Members");

module.exports = class AuthModel {

    static async FindMember (key) {
        const result = await MemberCollection().find({ key }).toArray();
        return result
    }
}