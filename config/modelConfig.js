const mongoose = require("mongoose");
const logger = require("../utils/systemLogs")

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/review_rating', {
    useNewUrlParser: true,
});
mongoose.connection.on("error", (err) => {
    // console.log("mongoose Connection Error", err);
    logger.log('error',"mongoose Connection Error");
});
mongoose.connection.on("connected", (err, res) => {
    // console.log("mongoose is connected");
    logger.log('info',"mongoose is connected");
});
