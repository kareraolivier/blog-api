const express = require("express");
const {
  createEvents,
  getAllEvents,
  deleteEvents,
  updateEvents,
  singleEvents,
  publishEvents,
  addImage,
} = require("../controllers/events.controller");

const { requireSignin } = require("../../middlewares");
const router = express.Router();
router.route("/").get(getAllEvents).post(requireSignin, createEvents);
router
  .route("/:id")
  .get(singleEvents)
  .delete(requireSignin, deleteEvents)
  .patch(requireSignin, updateEvents)
  .put(requireSignin, publishEvents);
router.route("/image").post(addImage);
module.exports = router;
