"use strict";

var _app = _interopRequireDefault(require("../app"));

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* GET index page. */
_app.default.get("/index", function (req, res, next) {
  _logger.default.info(JSON.stringify(req.cookies));

  res.header("Content-Type", "text/html");
  res.cookie("cookieName", Math.random().toString(), {
    maxAge: 90000,
    httpOnly: true
  });
  res.render("index", {
    title: "Express TS"
  });
});
//# sourceMappingURL=index.js.map