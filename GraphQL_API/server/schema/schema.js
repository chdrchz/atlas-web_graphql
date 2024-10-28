const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const _ = require("lodash"); // Import lodash
const Project = require('../models/project');
const Task = require('../models/task');

// Define TaskType
const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId); // Use the Project model to find the project
      },
    },
  }),
});

// Define ProjectType
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: GraphQLList(TaskType),
      resolve(parent, args) {
        return Task.find({ projectId: parent.id }); // Use the Task model to find tasks
      },
    },
  }),
});

// Define Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject: {
      type: ProjectType, // Response obj type
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });

        // Save new project to db
        return project.save();
      }
    }
  }
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(tasks, { id: args.id });
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(projects, { id: args.id });
      },
    },
    projects: {
      // New field to get all projects
      type: GraphQLList(ProjectType),
      resolve(parent, args) {
        return projects;
      },
    },
  },
});

// Create the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
