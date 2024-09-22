import { Request, Response } from "express";
import { Offer } from "../../entities/offer";
import { createNewOfferService } from "../../services";

const createNewOffer = async (req: Request, res: Response) => {
	const newOffer: Offer = await createNewOfferService(req.body);

	res.status(201).json(newOffer);
};

export default createNewOffer;
