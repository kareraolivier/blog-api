const { User } = require("./../../../models");
const { Op } = require("sequelize");
const dotenv = require("dotenv");
const { hashPassword } = require("./../../utils/auth");

dotenv.config();

const allUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Error. try Again",
    });
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      include: ["services", "application"],
      where: {
        uuid: req.user.uuid,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const { image } = req.body;
    const { id } = req.params;

    const user = await User.findOne({
      uuid: id,
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    await User.update(
      {
        image: image,
      },
      {
        where: {
          uuid: id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, email, lastName, phone, gender } = req.body;

    const user = await User.findOne({
      where: {
        uuid: id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    await User.update(
      {
        firstName: firstName,
        lastName: lastName,
        name: firstName,
        email: email,
        phone: phone,
        gender: gender,
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
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        uuid: id,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    await User.destroy({
      where: {
        uuid: id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "User successfully deleted",
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json({
      status: "error",
      message: "Delete user error",
    });
  }
};
module.exports = {
  allUsers,
  currentUser,
  deleteUser,
  updateUserInfo,
  updateProfilePicture,
};
