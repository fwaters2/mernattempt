const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL =
  "mongodb+srv://ultideveloper:0fdrvGi2rwgjpWG8@cluster0-8ploc.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "api";
const routes = require("./routes/api");
const path = require("path");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

//connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((something) => {
    console.log(`Database connected successfully`);
    //console.log("something", something.Collection);
  })
  .catch((err) => console.log(err, "mongoose test"));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

//app.set("view engine", "ejs");

// app.use((req, res, next) => {
//   //   res.header("Access-Control-Allow-Origin", "*");
//   //   res.header(
//   //     "Access-Control-Allow-Headers",
//   //     "Origin, X-Requested-With, Content-Type, Accept"
//   //   );
//   console.log("next causing the error");
//   //next();
// });

app.use(bodyParser.json());
//app.use(express.static(__dirname + "/index.ejs"));
// app.use((req, res, next) => {
//   res.send("Welcome to Express");
// });
//app.use("/apz", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("player");
      console.log("Connected to `" + DATABASE_NAME + "`!");
      console.log("collection", collection);
      app.post("/player", (request, response) => {
        collection.insert(request.body, (error, result) => {
          if (error) {
            return response.status(500).send(error);
          }
          response.send(result.result);
        });
      });
    }
  );
});

app.post("/player", (request, response) => {
  collection.insert(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result.result);
  });
});
