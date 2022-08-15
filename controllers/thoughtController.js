// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

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
      .then(async (thought) => {
        return res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No course with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((newThought) =>
        User.findOneAndUpdate(
          { username: newThought.username },
          { $addToSet: { thoughts: newThought._id } },
          { runValidators: true, new: true }
        )
      )
      .then((addedThought) =>
        !addedThought
          ? res.status(404).json({ message: "No application with this id!" })
          : res.json(addedThought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    const { thoughtId, newText } = req.body;
    Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText: newText },
      { runValidators: true, new: true }
    ).then((updatedThought) =>
      !updatedThought
        ? res.status(404).json({ message: "No application with this id!" })
        : res.json(updatedThought)
    );
  },

  removeThought(req, res) {
    Thought.findByIdAndRemove(req.params.thoughtId)
      .then((removedThought) =>
        User.findOneAndUpdate(
          { username: removedThought.username },
          { $pull: { thoughts: removedThought._id } }
        )
      )
      .then((removedThought) =>
        !removedThought
          ? res.status(404).json({ message: "No application with this id!" })
          : res.json(removedThought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $addToSet: { reactions: req.body },
      },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $pull: { reactions: reactionId },
      },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
