require("dotenv").config();
let Express = require('express')
const cors = require('cors')
require('./config/modelConfig')
const logger = require("./utils/systemLogs")
let commonRouter = require('./routes/mainRoutes')
const { transporter, mailOptions } = require("./service/emailService")
const cron = require("node-cron");

const PORT = process.env.PORT || 5000;
const HOST = "localhost"

let app = Express();

app.use(Express.json())
app.use(cors())
app.use('/', commonRouter)



app.get('/send', async (req, res) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
        }
    });
});

const server = app.listen(process.env.PORT, () => {
    // console.log(`Server is running on port number : ${process.env.PORT}`)
    logger.info(`Server started and is running on http://${HOST}:${PORT}`)
})

module.exports = server

//  cron.schedule("*/2 * * * * ", function () {
/*     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully " + info.response);
        }
    }); */
//}); 