const express = require("express");
const mongoose = require("mongoose");
const schema = require("../server/schema/schema");
const { graphqlHTTP } = require("express-graphql");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Enables the GraphiQL UI for testing
  })
);

app.listen(4000, () => {
  console.log("now listening for request on port 4000");
});

mongoose.connect('mongodb://localhost:27017/yourDatabaseName')
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.error("Connection error:", err);
  });

mongoose.connection.once("open", () => {
  console.log("connected to database");
});
