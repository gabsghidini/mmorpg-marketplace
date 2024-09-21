import { Router } from "express";

const offerRoutes = Router();

offerRoutes.get("/", (req, res) => {
	res.send("Hello, offer!");
});

export default offerRoutes;
