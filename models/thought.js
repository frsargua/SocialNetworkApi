const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

// Schema to create Student model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize our User model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
