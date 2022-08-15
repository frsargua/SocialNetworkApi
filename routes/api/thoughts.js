const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  removeThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought).put(updateThought);
router.route("/:thoughtId").get(getSingleThought).delete(removeThought);

module.exports = router;
