const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).get(getSingleUser).post(createUser);
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

module.exports = router;
