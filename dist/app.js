"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var path = _interopRequireWildcard(require("path"));

var fs = _interopRequireWildcard(require("fs"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _logger = _interopRequireDefault(require("./logger"));

var _morgan = _interopRequireDefault(require("morgan"));

var dotenv = _interopRequireWildcard(require("dotenv"));

var _youch = _interopRequireDefault(require("youch"));

var _dogs = _interopRequireDefault(require("./routes/dogs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.config(); // require("dotenv").config();

var reloadify = require("@skandasoft/reloadify")(__dirname);

var app = (0, _express.default)();
var _default = app;
exports.default = _default;
app.use(reloadify); // const Youch = require("youch");

var port = 4040;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(_express.default.static("public"));
app.use((0, _cookieParser.default)()); // log only 4xx and 5xx responses to console

app.use((0, _morgan.default)("dev", {
  skip: function skip(req, res) {
    return res.statusCode < 400;
  }
})); // log all requests to access.log

app.use((0, _morgan.default)("combined", {
  stream: fs.createWriteStream(path.join(__dirname, "../logs/access.log"), {
    flags: "a"
  })
})); // show on console -> method/sub url/time taken

app.use((0, _morgan.default)("dev", {
  skip: function skip(req, res) {
    return res.statusCode > 400;
  },
  stream: process.stdout
})); // reloadify will not work
// app.get("/", (req: Request, res: Response) => {
// 	res.status(200).send({
// 		message: "Hello Worlds!!!!",
// 	});
// });

app.use("/dogs", _dogs.default);

require("./routes/index"); // Then add some custom handling logic


app.use(function (error, req, res, next) {
  if (error && process.env.NODE_ENV !== "production" && !res.headersSent) {
    var youch = new _youch.default(error, req);
    return youch.toHTML().then(function (html) {
      return res.status(500).set("Content-Type", "text/html").send(html);
    });
  }

  next(error);
});
app.listen(port, function () {
  _logger.default.info("Express server listening on port " + port);

  _logger.default.info("Log level is " + process.env.LOG_LEVEL);
});
//# sourceMappingURL=app.js.map