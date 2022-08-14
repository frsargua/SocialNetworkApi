const router = require("express").Router();
const thoughtRoute = require("./thoughts");
const userRoute = require("./users");

router.use("/thoughts", thoughtRoute);
router.use("/users", userRoute);

module.exports = router;
