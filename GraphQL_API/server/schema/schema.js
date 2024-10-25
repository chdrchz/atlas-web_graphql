const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

// Define TaskType Object
const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
  },
});

// Define a RootQuery with a sample task for testing
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      task: {
        type: TaskType,
        resolve(parent, args) {
          // Example data; replace with database fetch or other data source as needed
          return { id: "1", title: "Example Task", weight: 5, description: "This is a sample task" };
        }
      }
    }
  });
  
  // Create a schema that includes the root query
  const schema = new GraphQLSchema({
    query: RootQuery
  });
  
module.exports = schema;
