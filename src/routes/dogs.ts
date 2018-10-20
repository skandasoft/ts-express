import * as express from "express";
import { Response, Request } from "express";

let router = express.Router({
	strict: true,
	caseSensitive: true,
});

router.get("/", (req: Request, res: Response) => {
	res.status(200).send("Hi Dogs here More Seen)");
});

router.get("/show", (req: Request, res: Response) => {
	res.status(200).send("show Case Sensitive");
});

export default router;
