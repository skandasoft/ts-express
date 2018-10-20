"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var express = _interopRequireWildcard(require("express"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var router = express.Router({
  strict: true,
  caseSensitive: true
});
router.get("/", function (req, res) {
  res.status(200).send("Hi Dogs here More Seen)");
});
router.get("/show", function (req, res) {
  res.status(200).send("show Case Sensitive");
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=dogs.js.map