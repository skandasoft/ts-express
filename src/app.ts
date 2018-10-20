import express, { NextFunction } from "express";
import { Request, Response } from "express";

import * as path from "path";

import * as fs from "fs";

import cookieParser from "cookie-parser";

import logger from "./logger";
import morgan from "morgan";

import * as dotenv from "dotenv";
dotenv.config();

// require("dotenv").config();

const reloadify = require("@skandasoft/reloadify")(__dirname);

const app = express();
export default app;

app.use(reloadify);

// const Youch = require("youch");
import { default as Youch } from "youch";

const port = 4040;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));

app.use(cookieParser());

// log only 4xx and 5xx responses to console
app.use(
	morgan("dev", {
		skip: function (req, res) {
			return res.statusCode < 400;
		},
	})
);

// log all requests to access.log
app.use(
	morgan("combined", {
		stream: fs.createWriteStream(path.join(__dirname, "../logs/access.log"), { flags: "a" }),
	})
);
// show on console -> method/sub url/time taken
app.use(
	morgan("dev", {
		skip: (req: Request, res: Response) => {
			return res.statusCode > 400;
		},
		stream: process.stdout,
	})
);

// reloadify will not work
// app.get("/", (req: Request, res: Response) => {
// 	res.status(200).send({
// 		message: "Hello Worlds!!!!",
// 	});
// });

import dogs from "./routes/dogs";
app.use("/dogs", dogs);

require("./routes/index");

// Then add some custom handling logic
app.use(function (error: Error, req: Request, res: Response, next: NextFunction) {
	if (error && process.env.NODE_ENV !== "production" && !res.headersSent) {
		const youch = new Youch(error, req);

		return youch.toHTML().then((html) => res.status(500).set("Content-Type", "text/html").send(html));
	}
	next(error);
});

app.listen(port, function () {
	logger.info("Express server listening on port " + port);
	logger.info("Log level is " + process.env.LOG_LEVEL);
});
