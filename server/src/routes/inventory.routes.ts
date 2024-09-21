import { Router } from "express";

const inventoryRouter = Router();

inventoryRouter.get("/", (req, res) => {
	res.send("Hello, inventory!");
});

export default inventoryRouter;
