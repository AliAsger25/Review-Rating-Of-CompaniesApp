let express = require('express')
let userRouter = require('./userRoutes')
let companyRouter = require('./companyRoutes')
let companyReviewRouter = require('./companyReviewRoutes')

let commonRouter = express.Router()

commonRouter.use('/user', userRouter)
commonRouter.use('/company', companyRouter)
commonRouter.use('/review', companyReviewRouter)

module.exports = commonRouter
