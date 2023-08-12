const bcrypt = require("bcrypt");
const userSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const { unlinkSync } = require("fs");
const { transporter } = require("../service/emailService");
const logger = require ("../utils/userLogger/userLogger");


let createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const userData = new userSchema(req.body);
  try {
    const isUserExist = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExist) {
      req.file ? unlinkSync(req.file.path) : null;
      logger.log("error","User is already registered with this email!!")
      res.status(409).json({
        success: false,
        message: "User is already registered with this email",
      });
    } else {
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      const filePath = `/uploads/userUploads${req.file.filename}`;
      userData.profilePic = filePath;
      userData.userName = req.body.userName.trim().split(" ").map((data) => {
        return data.charAt(0).toUpperCase() + data.slice(1);
      }).join(" ")
      const user = await userData.save();
      logge.log("info","User successfully registered")
      res.status(201).json({
        success: true,
        message: "User successfully registered",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

let userLogin = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        logger.log("info", "User login successfull ");
        res.status(200).json({
          success: true,
          message: "Login successfully",
          token: token,
        });
      } else {
        logger.log("error", "Invalid user email or password");
        res.status(401).json({
          success: false,
          message: "Invalid user email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "User is not registered with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const sendMailToResetPassword = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData != null) {
      const secret = userData._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "20m",
      });
      const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
      let info = await transporter.sendMail({
        from: "aliasger102002@gmail.com",
        to: userEmail,
        subject: "Email for user reset Password",
        html: `<a href=${link}>Click here to reset your password`,
      });
      logger.log("info", "Email sent successfully");
      return res.status(200).json({
        success: true,
        message: "Email sent successfully",
        token: token,
        userID: userData._id,
      });
    } else {
      logger.log("error", "Please Enter Valid Email");
      res.status(401).json({
        success: false,
        message: "Please Enter Valid Email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const userPasswordReset = async (req, res) => {
  const { id, token } = req.params;
  let { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await userSchema.findById(id);
    if (checkUser != null) {
      const secret = checkUser._id + process.env.JWT_SECRET_KEY;
      //jwt.verify(token, secret);
      if (newPassword == confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
        await userSchema.findByIdAndUpdate(checkUser._id, {
          $set: { userPassword: bcryptPassword },
        });
        logger.log("info", "Password updated successfully ")
        res.status(200).json({
          success: true,
          message: "Password updated successfully",
        });
      } else {
        logger.log("error", "Password and confirm password do not match!!")
        res.status(400).json({
          success: false,
          error: "Password and confirm password do not match"
        });
      }
    } else {
      logger.log("error", "Employee not found!!")
      res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errror: err.message,
    });
  }
};

module.exports = {
  createUser,
  userLogin,
  sendMailToResetPassword,
  userPasswordReset,
};
