const { Schema, model } = require("mongoose");
const assignmentSchema = require("./user");

// Schema to create Student model
const studentSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: {
    reactionSchema,
  },
});

module.exports = Student;
