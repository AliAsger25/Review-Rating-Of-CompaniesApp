let express = require("express");
let user = require("../controller/userController");
let { registerUserValidation, } = require("../validations/user/userDataValidate");
let { loginUserValidation } = require("../validations/user/userDataValidate");
let { resetPasswordValidation, } = require("../validations/user/userDataValidate");
const { userUpload } = require("../middlewares/userImageStorage")
const { userAuthentication } = require("../middlewares/authToken");

let router = express.Router();

router.post("/create", userUpload.single("profilePic"), registerUserValidation, user.createUser);
router.post("/login", loginUserValidation, user.userLogin);
router.post("/sendmail", user.sendMailToResetPassword);
router.post("/userpasswordreset/:id/:token", resetPasswordValidation, user.userPasswordReset);

module.exports = router;
