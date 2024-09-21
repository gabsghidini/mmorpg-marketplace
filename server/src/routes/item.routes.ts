import { Router } from "express";

const itemRouter = Router();

itemRouter.get("/", (req, res) => {
	res.send("Hello, item!");
});

export default itemRouter;
