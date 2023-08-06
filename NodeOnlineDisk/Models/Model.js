const { MongoClient } = require('mongodb');

class Model {
    static database;
    static Client = new MongoClient('mongodb://127.0.0.1:27017');

    static async ConnectWithMongoDb () {
        try {
            await this.Client.connect();
            this.database = this.Client.db('OnlineDisk');
            console.log("Connecting With MongoDb Database :)");
        }
        catch {
            console.log("Not connecting With MongoDb Database :(");
        }
    }
}

module.exports = { Model };