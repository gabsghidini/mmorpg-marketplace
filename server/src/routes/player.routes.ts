import { Router } from "express";
import {
	createNewPlayer,
	getAllPlayers,
	getPlayerById,
	updatePlayerById,
	deletePlayerById,
} from "../controllers";

const playerRouter = Router();

/* CREATE */
playerRouter.post("/", createNewPlayer);

/* READ */
playerRouter.get("/", getAllPlayers);
playerRouter.get("/:id", getPlayerById);

/* UPDATE */
playerRouter.patch("/:id", updatePlayerById);

/* DELETE */
playerRouter.delete("/:id", deletePlayerById);

export default playerRouter;
