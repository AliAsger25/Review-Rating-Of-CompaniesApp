const joi = require("joi")
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const companySchema = {
    registerCompany: joi.object({
        companyName: joi
            .string()
            .min(3)
            .max(20)
            .message({
                "string.min": "{#label} should contain at least {#limit} characters",
                "string.max": "{#label} should contain at least {#limit} characters",
            })
            .required(),
        companyCity: joi
            .string()
            .required(),
        companyLocation: joi
            .string()
            .required(),
    }),
}

module.exports = {
    companySchema
};
