const { Blog } = require("./../../../models");

const createBlogs = async (req, res) => {
  try {
    const { title, image, authorName, description, date } = req.body;

    if (!title) return res.status(400).send("title is required");
    if (!image) return res.status(400).send("image is required");
    if (!authorName) return res.status(400).send("authorName is required");
    if (!description) return res.status(400).send("description is required");

    await Blog.create({
      title,
      image,
      authorName,
      description,
      published: "false",
      date,
    });

    res.status(200).json({
      status: "success",
      message: "blog Saved successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      blog: "Error. Try again",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json({
      status: "success",
      blogs,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      blog: "Error. Try again",
    });
  }
};

const singleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({
      where: {
        uuid: id,
      },
    });
    if (!blog) {
      return res.status(404).json({ status: "fail", blog: "Blog not found" });
    }
    await Blog.findOne({
      where: {
        uuid: id,
      },
    });
    res.status(200).json({
      status: "success",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error. Try again",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({
      where: {
        uuid: id,
      },
    });

    if (!blog) {
      return res.status(404).json({ status: "fail", blog: "Blog not found" });
    }

    await Blog.destroy({
      where: {
        uuid: id,
      },
    });
    res.status(200).json({
      status: "success",
      blog: "Blog successfully deleted",
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      status: "error",
      blog: "Delete blog error",
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, authorName, description, date } = req.body;

    const blog = await Blog.findOne({
      where: {
        uuid: id,
      },
    });

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }

    await Blog.update(
      {
        title: title,
        image: image,
        authorName: authorName,
        description: description,
        date: date,
      },
      {
        where: {
          uuid: id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const publishBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;

    const blog = await Blog.findOne({
      where: {
        uuid: id,
      },
    });

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found",
      });
    }

    await Blog.update(
      {
        published: published,
      },
      {
        where: {
          uuid: id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Published Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
module.exports = {
  createBlogs,
  getAllBlogs,
  singleBlog,
  deleteBlog,
  updateBlog,
  publishBlog,
};
