const express = require("express");
const {
  index,
  create,
  update,
  addComment,
  addMedia,
} = require("../controllers/product");
const schemas = require("../validations/product");
const validate = require("../middlewares/validate");

const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

const router = express.Router();

router.route("/").get(index);
router
  .route("/:id/add-comment")
  .post(authenticate, validate(schemas.addComment, "body"), addComment);

router
  .route("/")
  .post(authenticateAdmin, validate(schemas.createProduct, "body"), create);
router
  .route("/:id")
  .patch(authenticateAdmin, validate(schemas.updateProduct, "body"), update);
router.route("/:id/add-media").post(authenticateAdmin, addMedia);

module.exports = router;
