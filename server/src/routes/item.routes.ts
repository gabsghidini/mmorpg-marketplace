import { Router } from "express";
import {
	createNewItem,
	getAllItems,
	getItemById,
	updateItemById,
	deleteItemById,
} from "../controllers";

const itemRouter = Router();

/* CREATE */
itemRouter.post("/", createNewItem);

/* READ */
itemRouter.get("/", getAllItems);
itemRouter.get("/:id", getItemById);

/* UPDATE */
itemRouter.patch("/:id", updateItemById);

/* DELETE */
itemRouter.delete("/:id", deleteItemById);

export default itemRouter;
