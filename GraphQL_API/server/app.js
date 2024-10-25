const express = require("express");
const schema = require('../server/schema/schema');
const { graphqlHTTP } = require("express-graphql");
const { GraphQLScalarType, GraphQLSchema } = require("graphql");

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true  // Enables the GraphiQL UI for testing
  }));

app.listen(4000, () => {
  console.log("now listening for request on port 4000");
});