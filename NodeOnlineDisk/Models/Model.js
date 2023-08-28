class Model {
    static Collection = '';

    static setCollection (collection) {
        try {
            this.Collection = collection;
        } catch (error) {
            console.log(`The error from Model.js in GetData(): ${error.message}`);
        }
    }

    static async GetData (database, obj = null) {
        try {
            const result = await database.collection(this.Collection)
                .find(obj === null ? {} : obj)
                .toArray();

            return result;
        } catch (error) {
            console.log(`The error from Model.js in GetData(): ${error.message}`);
        }
    }

    static async InsertData (database, obj = null) {
        try {
            await database.collection(this.Collection)
                .insertOne(obj);
        } catch (error) {
            console.log(`The error from Model.js in GetData(): ${error.message}`);
        }
    }
};

module.exports = { Model };