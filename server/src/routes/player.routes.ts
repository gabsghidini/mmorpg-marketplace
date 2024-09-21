import { Router } from "express";
import { createNewPlayer } from "../controllers";

const playerRouter = Router();

playerRouter.get("/", (req, res) => {
	res.send("Hello, player!");
});

playerRouter.post("/", createNewPlayer);

export default playerRouter;
