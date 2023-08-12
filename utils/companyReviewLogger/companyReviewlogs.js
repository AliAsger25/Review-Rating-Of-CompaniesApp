const { createLogger, transports, format } = require("winston");
require("winston-mongodb");


const reviewLogger = createLogger({
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `level : ${info.level}:${[info.timestamp]} : ${info.message}`),
            ),
        }),
        new transports.Console({
            level: "error",
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(error => `level : ${error.level}:${[error.timestamp]} : ${error.message}`),
            ),
        }),
        new transports.File({
            filename: "logs/reviewLog_info.log",
            level: "info",
            maxsize: 5242880,
            maxFiles: 5,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `level : ${info.level}:${[info.timestamp]} : ${info.message}`),
            ),
        }),
        new transports.File({
            filename: "logs/reviewLog_error.log",
            level: "error",
            maxsize: 5242880,
            maxFiles: 5,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(error => `level : ${error.level}:${[error.timestamp]} : ${error.message}`),
            ),
        }),
        new transports.MongoDB({
            level: "info",
            db: process.env.URL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'logData',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: "error",
            db: process.env.URL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'logData',
            format: format.combine(format.timestamp(), format.json())
        })
    ],
})

module.exports = reviewLogger;