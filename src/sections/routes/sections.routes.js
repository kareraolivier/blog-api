const express = require("express");
const {
  createSectionss,
  getAllSectionss,
  deleteSections,
  updateSections,
  singleSections,
} = require("../controllers/sections.controller");

const { requireSignin } = require("../../middlewares");
const router = express.Router();
router.route("/").get(getAllSectionss).post(requireSignin, createSectionss);
router
  .route("/:id")
  .get(singleSections)
  .delete(requireSignin, deleteSections)
  .patch(requireSignin, updateSections);
module.exports = router;
