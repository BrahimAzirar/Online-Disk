const ex = require('express');
const cors = require("cors");
const { MongoClient } = require("mongodb");
const authRoutes = require('./Routes/Authentification');

const app = ex();
const domains = ["http://localhost:3000"];
const connection = new MongoClient('mongodb://127.0.0.1:27017');

const ConnectWithDatabase = async () => {
  try {
    await connection.connect();
    console.log("The database has been successfully connected :)");
  } catch {
    console.log("The database not has been successfully connected :(");
  }
};

ConnectWithDatabase();

const Alloworigin = {
  origin: (origin, callback) => {
    if (!origin || domains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

app.use(cors(Alloworigin));
app.use(ex.json());
app.use('/auth', authRoutes);

app.listen(3500, () => console.log("http://localhost:3500"));

module.exports = connection;