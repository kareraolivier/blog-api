const express = require("express");
const {
  createBlogs,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  singleBlog,
  publishBlog,
} = require("../controllers/blogs.controller");

const { requireSignin } = require("./../../middlewares");
const router = express.Router();
router.route("/").get(getAllBlogs).post(requireSignin, createBlogs);
router
  .route("/:id")
  .get(singleBlog)
  .delete(requireSignin, deleteBlog)
  .patch(requireSignin, updateBlog)
  .put(requireSignin, publishBlog);

module.exports = router;
