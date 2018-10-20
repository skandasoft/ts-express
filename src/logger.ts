import { createLogger, format, transports } from "winston";
const level = process.env.LOG_LEVEL || "debug";
const { combine, timestamp, label, printf } = format;

const myFormat = printf((info) => {
	return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
	level: level,
	format: combine(label({ label: "see me" }), timestamp(), format.colorize(), myFormat),
	transports: [
		//
		// - Write to all logs with level `info` and below to `combined.log`
		// - Write all logs error (and below) to `error.log`.
		//
		new transports.File({ filename: "./logs/error.log", level: "error" }),
		// new transports.File({ filename: './logs/combined.log' })
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new transports.Console({
			format: myFormat,
		})
	);
}

// export { logger as logger };
export default logger;

/* 
var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};


var logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
}); 
*/
