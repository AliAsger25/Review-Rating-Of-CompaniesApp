const bcrypt = require("bcrypt");
const companySchema = require("../models/companySchema");
const companyReviewSchema = require("../models/companyReviewSchema")
const jwt = require("jsonwebtoken");
const { unlinkSync } = require("fs");
const { transporter } = require("../service/emailService");
const logger = require("../utils/companyLogger/companyLogger");


module.exports = {
  createCompany: async (req, res) => {
    const companyData = new companySchema(req.body);
    try {
      const isCompanyExist = await companySchema.findOne({
        companyName: req.body.companyName,
      });
      if (isCompanyExist) {
        req.file ? unlinkSync(req.file.path) : null;
        logger.log("error", "Company is already registered with this name!");
        res.status(409).json({
          success: false,
          message: "Company is already registered with this name!!",
        });
      } else {
        const filePath = `/uploads/compnayUploads${req.file.filename}`;
        companyData.profilePic = filePath;
        companyData.companyName = req.body.companyName.trim().split(" ").map((data) => {
          return data.charAt(0).toUpperCase() + data.slice(1);
        }).join(" ")
        const company = await companyData.save();
        logger.log("info", "Company successfully registered.");
        res.status(201).json({
          success: true,
          message: "Company successfully registered",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },

  listCompany: async (req, res) => {
    try {
      const companyList = await companySchema.find();
      const totalCompany = await companySchema.find().count();
      logger.log("info","All company found successfully")
      res.status(200).json({
        success: true,
        message: "All company found successfully",
        count: totalCompany,
        companies: companyList,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

  companyDetails: async (req, res) => {
    try {
      const companyData = await companySchema.findById(req.params.id);
      const reviewDataList = await companyReviewSchema
        .find({ companyId: req.params.id })
        .populate({ path: "userId", select: "userName profilePic" });
      logger.log("info","Review list found successfully")
        res.status(200).json({
        success: true,
        message: "Review list found successfully",
        company: companyData,
        review: reviewDataList,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: `Error not found ${err.message}`,
      });
    }
  },

  companySearch: async (req, res) => {
    const { letter } = req.params;
    try {
      const companies = await companySchema.find({
        companyName: { $regex: `^${letter}`, $options: 'i' },
      });
      if (companies.length > 0) {
        logger.log("info","Companies found successfully")
        res.status(200).send({
          success: true,
          message: "Company detail",
          companies: companies,
        })
      } else {
        logger.log("error","Company detail not found")
        res.status(404).send({
          success: false,
          message: "Company detail not found",
        })
      }
    } catch (err) {
      res.status(400).send({
        success: false,
        message: err.message
      });
    }
  },

  companySort: async (req, res) => {
    try {
      const sort = await companySchema.find({}).sort({ companyName: 1 })
      logger.log("info","Companies sorted successfully")
      res.status(200).send({
        success: true,
        message: "Sorted in asscendin order",
        data: sort,
      })
    } catch (err) {
      res.status(400).send({
        success: false,
        messgae: err.message,
      })
    }
  }
};
