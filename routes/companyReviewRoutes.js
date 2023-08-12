let express = require("express");
let review = require("../controller/companyReviewController")

let router = express.Router();

router.post("/createreview", review.createReview);
router.patch("/updatereview/:id", review.updateReview);
router.delete("/deletereview/:id", review.deleteReview);
router.get("/listreviews", review.listCompanyReview);

module.exports = router;
