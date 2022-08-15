// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { Thought } = require("../models");

// TODO: Create an aggregate function to get the number of students overall
const headCount = async () =>
  Student.aggregate()
    // Your code here
    .then((numberOfStudents) => numberOfStudents);

// Execute the aggregate method on the Student model and calculate the overall grade by using the $avg operator
const grade = async (studentId) =>
  Student.aggregate([
    // TODO: Ensure we include only the student who can match the given ObjectId using the $match operator
    {
      // Your code here
    },
    {
      $unwind: "$assignments",
    },
    // TODO: Group information for the student with the given ObjectId alongside an overall grade calculated using the $avg operator
    {
      // Your code here
    },
  ]);

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then(async (students) => {
        return res.json(students);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
