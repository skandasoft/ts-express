"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = require("winston");

var level = process.env.LOG_LEVEL || "debug";
var combine = _winston.format.combine,
    timestamp = _winston.format.timestamp,
    label = _winston.format.label,
    printf = _winston.format.printf;
var myFormat = printf(function (info) {
  return "".concat(info.timestamp, " [").concat(info.label, "] ").concat(info.level, ": ").concat(info.message);
});
var logger = (0, _winston.createLogger)({
  level: level,
  format: combine(label({
    label: "see me"
  }), timestamp(), _winston.format.colorize(), myFormat),
  transports: [//
  // - Write to all logs with level `info` and below to `combined.log`
  // - Write all logs error (and below) to `error.log`.
  //
  new _winston.transports.File({
    filename: "./logs/error.log",
    level: "error"
  })]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new _winston.transports.Console({
    format: myFormat
  }));
} // export { logger as logger };


var _default = logger;
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

exports.default = _default;
//# sourceMappingURL=logger.js.map