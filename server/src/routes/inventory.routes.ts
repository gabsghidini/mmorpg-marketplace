import { Router } from "express";
import { addItemToPlayer } from "../controllers";

const inventoryRouter = Router();

/* CREATE */
inventoryRouter.post("/:id", addItemToPlayer);
/* READ */

/* UPDATE */

/* DELETE */

export default inventoryRouter;
