const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the task schema based on the sample project data in schema.js
const projectSchema = new Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Project", projectSchema);