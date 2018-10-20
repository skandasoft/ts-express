import app from "../app";
import logger from "../logger";

/* GET index page. */
app.get("/index", (req, res, next) => {
	logger.info(JSON.stringify(req.cookies));
	res.header("Content-Type", "text/html");
	res.cookie("cookieName", Math.random().toString(), { maxAge: 90000, httpOnly: true });
	res.render("index", { title: "Express TS" });
});
