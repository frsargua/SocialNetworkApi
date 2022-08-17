// ObjectId() method for converting studentId string into an ObjectId for querying database
const { Thought, User } = require("../models");

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
          ? res.status(404).json({ message: "No thought with that ID" })
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
          ? res.status(404).json({ message: "No username found!" })
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
    )
      .then((updatedThought) =>
        !updatedThought
          ? res
              .status(404)
              .json({ message: "No thought found with the ID provided" })
          : res.json(updatedThought)
      )
      .catch((err) => res.status(500).json(err));
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
          ? res
              .status(404)
              .json({ message: "No thought found with the ID provided!" })
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
              .json({ message: "No Thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    let { reactionId: id } = req.body;
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $pull: { reactions: { reactionId: id } },
      },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No Thought found with that ID :(" })
          : thought.reactions.some((reaction) => {
              if (!(reaction.reactionId.toHexString() == id)) {
                return true;
              }
              return false;
            })
          ? res
              .status(404)
              .json({ message: "No reaction found with this ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
