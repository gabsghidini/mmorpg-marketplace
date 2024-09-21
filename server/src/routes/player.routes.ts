import { Router } from "express";

const playerRouter = Router();

playerRouter.get("/", (req, res) => {
	res.send("Hello, player!");
});

export default playerRouter;
