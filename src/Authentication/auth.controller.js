const { User } = require("../../models");
const { hashPassword, comparePassword } = require("./../utils/auth");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// import sgMail =require( "@sendgrid/mail");

dotenv.config();

const register = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    if (!firstName) return res.status(400).send("First Name is required");
    if (!lastName) return res.status(400).send("Last Name is required");

    if (!email) return res.status(400).send("email is required");

    if (!phone) return res.status(400).send("Phone is required");

    if (!password || password.length < 8) {
      return res
        .status(400)
        .send("Password is required and should be min 8 characters long");
    }

    const userExist = await User.findOne({
      where: { email },
    });

    if (userExist)
      return res.status(400).send("You already have account, Please login");

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name: firstName,
      firstName,
      lastName,
      phone,
      email,
      password,
      password: hashedPassword,
      gender: "male",
    });

    res.status(200).json({
      status: "success",
      user,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again.");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);
    const user = await User.findOne({
      attributes: {
        exclude: ["passwordResetCode"],
      },
      where: {
        email: email,
      },
    });

    console.log("USER", user);

    const match = await comparePassword(password, user.password);

    if (!match || !user) {
      return res.status(403).send("Invalid email or Password");
    }

    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      message: `Welcome ${user.firstName}`,
      user,
      token,
    });
  } catch (err) {
    console.log("err", err.stack);
    return res.status(500).send("Error Login. Try again.");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");

    return res.json({ message: "Signout success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again.");
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: { exclude: ["password"] },
      where: { uuid: req.user.uuid },
    });

    if (user.role === process.env.FIRST_USER) {
      return res.status(200).json({ firstUser: true, user });
    }

    if (user.role === process.env.SECOND_USER) {
      return res.status(200).json({ secondUser: true, user });
    }

    if (user.role === process.env.THIRD_USER) {
      return res.status(200).json({ thirdUser: true, user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error. Try again");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).send({ error: "User doesn't exist" });
    }

    const setCode = Math.floor(10000 + Math.random() * 90000).toString();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    sgMail
      .send({
        to: email,
        from: process.env.EMAIL_FROM,
        subject: "Reset password",
        text: "Hello!",
        html: `Welcome to Der Sprachen Hub! <br> The code to rest password is : <strong>${setCode}</strong> Copy and paste it correcty`,
      })
      .then(async (response) => {
        await User.update(
          { passwordResetCode: setCode },
          { where: { email: email } }
        );

        res.status(200).send({
          message:
            "The Code sent to your email successfully, please use it to reset password",
        });
      })
      .catch((error) => {
        return res
          .status(500)
          .send({ message: "Unable to send email", error: error });
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const hashedPassword = await hashPassword(newPassword);

    const user = User.findOne({
      where: {
        email,
        passwordResetCode: code,
      },
    });

    if (!user) {
      return res.status(404).send("No user found");
    }

    await User.update(
      {
        password: hashedPassword,
        passwordResetCode: "",
      },
      {
        where: {
          email,
          passwordResetCode: code,
        },
      }
    );

    res.status(200).json({ message: "Password is updated successfully" });
  } catch (err) {
    console.log("error", err);
    return res.status(500).send("Error ! Try again");
  }
};

module.exports = {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  currentUser,
};
