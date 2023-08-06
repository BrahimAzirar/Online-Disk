const ex = require('express');
const cors = require("cors");
const MembersRoutes = require('./Routes/MemberRoutes');
const { Model } = require("./Models/Model")

const app = ex();
const domains = ["http://localhost:3000"];

const Alloworigin = {
  origin: (origin, callback) => {
    if (!origin || domains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

Model.ConnectWithMongoDb();

app.use(cors(Alloworigin));
app.use(ex.json());
app.use('/auth', MembersRoutes);

app.listen(3500, () => console.log("http://localhost:3500"));