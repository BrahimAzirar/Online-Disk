const { Model } = require('./Model');

class MemberModel extends Model {

    static coll = 'Members';

    static async FindMember (username = null) {
        try {
            if (username) {
                return await this.database.collection(this.coll).find({username}).toArray();
            };

            return await this.database.collection(this.coll).find({}).toArray();
        }
        catch (err) {
            return err;
        }
    }

}

module.exports = { MemberModel };