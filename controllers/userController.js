const { User, Thought } = require("../models/index");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get an user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create an user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete an User
  async deleteUser(req, res) {
    try {
      let user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "No User with that ID" });
      }
      Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and Thoughts deleted!" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Update a course
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  async addFriend(req, res) {
    try {
      const newFriend = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!newFriend) {
        return res.status(404).json({ success: false });
      }
      return res.json({ success: true, data: newFriend });
    } catch (error) {
      console.log(
        `[ERROR]: Failed to add tag to application | ${error.message}`
      );
      return res.status(500).json({ success: false });
    }
  },

  async removeFriend(req, res) {
    try {
      const newFriend = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!newFriend) {
        return res.status(404).json({ success: false });
      }
      return res.json({ success: true, data: newFriend });
    } catch (error) {
      console.log(
        `[ERROR]: Failed to add tag to application | ${error.message}`
      );
      return res.status(500).json({ success: false });
    }
  },
};
