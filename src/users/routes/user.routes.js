const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("./../../Authentication/auth.controller");
const {
  allUsers,
  updateUserInfo,
  deleteUser,
} = require("./../controllers/user.controller");

const { requireSignin } = require("./../../middlewares");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// router.get("/current/admin", requireSignin, currentAdmin);
// router.get("/current-user", requireSignin, currentUser);
router.get("/", allUsers);
router
  .route("/:id")
  .delete(requireSignin, deleteUser)
  .patch(requireSignin, updateUserInfo);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// router.patch("/update/profile/image/:id", requireSignin, updateProfilePicture);
router.patch("/update/profile/info/:id", requireSignin, updateUserInfo);

module.exports = router;
