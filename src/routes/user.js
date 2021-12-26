const express = require("express");
const { index, create, login, resetPassword } = require("../controllers/user");
const {
  createUser,
  createAdminUser,
  userLogin,
  resetPW,
} = require("../validations/user");
const validate = require("../middlewares/validate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

const router = express.Router();

router
  .route("/create-admin-user")
  .post(validate(createAdminUser, "body"), create);
router.route("/login").post(validate(userLogin, "body"), login);
router.route("/reset-password").post(validate(resetPW, "body"), resetPassword);

router.route("/").get(authenticateAdmin, index);
router.route("/").post(authenticateAdmin, validate(createUser, "body"), create);

module.exports = router;
