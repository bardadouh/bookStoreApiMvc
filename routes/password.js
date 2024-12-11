const express = require("express");
const {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordLinkView,
  resetThePassword,
} = require("../controllers/passwordController");
const router = express.Router();

// /password/forgot-password
router
  .route("/forgot-password")
  .get(getForgotPasswordView)
  .post(sendForgotPasswordLink);

// /password/reset-password/:userId

router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordLinkView)
  .post(resetThePassword);
module.exports = router;
