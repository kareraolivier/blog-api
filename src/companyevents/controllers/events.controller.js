const { Events } = require("../../../models");
const { uploadImage } = require("../../../config/uploadImage");

const createEvents = async (req, res) => {
  try {
    // const coverImage = uploadImage(req.body.image)
    //   .then((url) => res.send(url))
    //   .catch((err) => res.status(500).send(err));
    const { title, coverImage, location, description, date } = req.body;

    if (!title) return res.status(400).send("title is required");
    if (!coverImage) return res.status(400).send("coverImage is required");
    if (!location) return res.status(400).send("location is required");
    if (!description) return res.status(400).send("description is required");
    if (!date) return res.status(400).send("date is required");

    await Events.create({
      title,
      coverImage,
      location,
      description,
      published: "false",
      date,
    });

    res.status(200).json({
      status: "success",
      message: "events Saved successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      events: "Error. Try again",
    });
  }
};

const addImage = async (req, res) => {
  const coverImage = await uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Events.findAll();
    res.status(200).json({
      status: "success",
      events,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      events: "Error. Try again",
    });
  }
};

const singleEvents = async (req, res) => {
  try {
    const { id } = req.params;

    const events = await Events.findOne({
      where: {
        uuid: id,
      },
    });
    if (!events) {
      return res
        .status(404)
        .json({ status: "fail", events: "Events not found" });
    }
    await Events.findOne({
      where: {
        uuid: id,
      },
    });
    res.status(200).json({
      status: "success",
      events,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error. Try again",
    });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const { id } = req.params;

    const events = await Events.findOne({
      where: {
        uuid: id,
      },
    });

    if (!events) {
      return res
        .status(404)
        .json({ status: "fail", events: "Events not found" });
    }

    await Events.destroy({
      where: {
        uuid: id,
      },
    });
    res.status(200).json({
      status: "success",
      events: "Events successfully deleted",
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      status: "error",
      events: "Delete events error",
    });
  }
};

const updateEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, coverImage, location, description, date } = req.body;

    const events = await Events.findOne({
      where: {
        uuid: id,
      },
    });

    if (!events) {
      return res.status(404).json({
        status: "fail",
        message: "Events not found",
      });
    }

    await Events.update(
      {
        title: title,
        coverImage: coverImage,
        location: location,
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

const publishEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const { published } = req.body;

    const events = await Events.findOne({
      where: {
        uuid: id,
      },
    });

    if (!events) {
      return res.status(404).json({
        status: "fail",
        message: "Events not found",
      });
    }

    await Events.update(
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
  createEvents,
  getAllEvents,
  singleEvents,
  deleteEvents,
  updateEvents,
  publishEvents,
  addImage,
};
