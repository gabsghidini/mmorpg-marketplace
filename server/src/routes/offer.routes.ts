import { Router } from "express";
import {
	createNewOffer,
	getAllOffers,
	getOfferById,
	updateOfferById,
	deleteOfferById,
} from "../controllers";

const offerRoutes = Router();

/* CREATE */
offerRoutes.post("/", createNewOffer);

/* READ */
offerRoutes.get("/", getAllOffers);
offerRoutes.get("/:id", getOfferById);

/* UPDATE */
offerRoutes.patch("/:id", updateOfferById);

/* DELETE */
offerRoutes.delete("/:id", deleteOfferById);

export default offerRoutes;
