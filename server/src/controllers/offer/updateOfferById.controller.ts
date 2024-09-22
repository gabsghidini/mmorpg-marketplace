import { Request, Response } from "express";
import { Offer } from "../../entities/offer";
import { updateOfferByIdService } from "../../services";

const updateOfferById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { price } = req.body;

	const offer: Offer = await updateOfferByIdService(id, price);

	res.status(200).json(offer);
};

export default updateOfferById;
