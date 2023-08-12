let express = require("express");
let company = require("../controller/companyController");
const { registerCompanyValidation } = require("../validations/company/companyDataValidate");
const {userAuthentication} = require("../middlewares/authToken");
const { companyUpload } = require("../middlewares/companyImageStorage");

let router = express.Router();

router.post("/createcompany", userAuthentication,companyUpload.single("profilePic"), registerCompanyValidation, company.createCompany);
router.get("/listcompany", company.listCompany);
router.get("/companydetails/:id", company.companyDetails);
router.get("/searchcompany/:letter", company.companySearch);
router.get("/sortcompany", company.companySort);

module.exports = router;
