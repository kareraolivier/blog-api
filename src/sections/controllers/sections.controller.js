const { Sections } = require("../../../models");

const createSectionss = async (req, res) => {
  try {
    const { title, coverImage, type, description, date } = req.body;

    if (!title) return res.status(400).send("title is required");
    if (!coverImage) return res.status(400).send("coverImage is required");
    if (!type) return res.status(400).send("type is required");
    if (!description) return res.status(400).send("description is required");

    await Sections.create({
      title,
      coverImage,
      type,
      description,
      date,
    });

    res.status(200).json({
      status: "success",
      message: "sections Saved successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      sections: "Error. Try again",
    });
  }
};

const getAllSectionss = async (req, res) => {
  try {
    const sectionss = await Sections.findAll();
    res.status(200).json({
      status: "success",
      sectionss,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      sections: "Error. Try again",
    });
  }
};

const singleSections = async (req, res) => {
  try {
    const { id } = req.params;

    const sections = await Sections.findOne({
      where: {
        uuid: id,
      },
    });
    if (!sections) {
      return res
        .status(404)
        .json({ status: "fail", sections: "Sections not found" });
    }
    await Sections.findOne({
      where: {
        uuid: id,
      },
    });
    res.status(200).json({
      status: "success",
      sections,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error. Try again",
    });
  }
};

const deleteSections = async (req, res) => {
  try {
    const { id } = req.params;

    const sections = await Sections.findOne({
      where: {
        uuid: id,
      },
    });

    if (!sections) {
      return res
        .status(404)
        .json({ status: "fail", sections: "Sections not found" });
    }

    await Sections.destroy({
      where: {
        uuid: id,
      },
    });
    res.status(200).json({
      status: "success",
      sections: "Sections successfully deleted",
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      status: "error",
      sections: "Delete sections error",
    });
  }
};

const updateSections = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, coverImage, type, description, date } = req.body;

    const sections = await Sections.findOne({
      where: {
        uuid: id,
      },
    });

    if (!sections) {
      return res.status(404).json({
        status: "fail",
        message: "Sections not found",
      });
    }

    await Sections.update(
      {
        title: title,
        coverImage: coverImage,
        type: type,
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

const publishSections = async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;

    const sections = await Sections.findOne({
      where: {
        uuid: id,
      },
    });

    if (!sections) {
      return res.status(404).json({
        status: "fail",
        message: "Sections not found",
      });
    }

    await Sections.update(
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
  createSectionss,
  getAllSectionss,
  singleSections,
  deleteSections,
  updateSections,
  publishSections,
};
