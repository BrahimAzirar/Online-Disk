const ex = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const session = require('express-session');
const MongoSessions = require('connect-mongodb-session')(session);

const auth = require('./Routes/Auth');
const folders = require('./Routes/Folders');

const { MemberModel } = require('./Models/MemberModel');
const { FoldersModel } = require('./Models/FoldersModel');

const url = 'mongodb://127.0.0.1:27017';
const database = 'OnlineDisk';
const app = ex();

MemberModel.setCollection('Members');
FoldersModel.setCollection('Folders');

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db(database);
        console.log("Connected with database :)");

        const store = new MongoSessions({ uri: `${url}/${database}`, collection: 'mySessions' });
        store.on('error', error => { throw new Error(error) });

        app.locals.db = db;
        app.use(ex.json());
        app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

        app.use(session({ 
            key: "sessionId", secret: "thesecretkey", resave: false, 
            saveUninitialized: false, store: store, 
            cookie: { secure: false, maxAge: 1000 * 60 * 60 * 2 }
        }));

        app.use('/auth', auth);
        app.use('/folders', folders);

        app.listen(3500, console.log('http://localhost:3500'));

    })
    .catch(err => console.log(`the error from server.js: ${err.message}`));