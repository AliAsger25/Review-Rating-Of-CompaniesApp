const companyReviewSchema = require("../models/companyReviewSchema");
const logger = require("../utils/companyReviewLogger/companyReviewlogs");

const createReview = async (req, res) => {
    const reviewData = new companyReviewSchema(req.body);
    try {
        await reviewData.save();
        logger.log("info","Review added successfully")
        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review: reviewData,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error occur ${error.message}`
        });
    }
};

const updateReview = async (req, res) => {
    try {
        const reviewData = await companyReviewSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
        );
        if (reviewData) {
            logger.log("info","Company review updated sucessfully")
            res.status(201).send({
                success: true,
                message: "Company review updated sucessfully",
                updateReview: reviewData,
            });
        } else {
            logger.log("error","Company review not found")
            res.status(404).send({
                success: false,
                message: "Company review not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Error occur ${error.message}`
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewData = await companyReviewSchema.findByIdAndDelete(req.params.id);
        if (reviewData) {
            logger.log("info","Company review deleted sucessfully")
            res.status(202).send({
                success: true,
                message: "Company review deleted sucessfully",
                deleteReview: reviewData,
            });
        } else {
            logger.log("error","Company review not found")
            res.status(404).send({
                success: false,
                message: "Company review not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Error occur ${error.message}`
        });
    }
};

const listCompanyReview = async (req, res) => {
    try {
        const companyReviewList = await companyReviewSchema.find();
        const totalCompany = await companyReviewSchema.find().count();
        logger.log("info","All company reviews found successfully")
        res.status(200).json({
            success: true,
            message: "All company reviews found successfully",
            count: totalCompany,
            companies: companyReviewList,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    listCompanyReview
};
