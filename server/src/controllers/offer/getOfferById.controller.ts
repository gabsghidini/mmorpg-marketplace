import { Request, Response } from "express";
import { Offer } from "../../entities/offer";
import { getOfferByIdService } from "../../services";

const getOfferById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const offer: Offer = await getOfferByIdService(id);

	res.status(200).json(offer);
};

export default getOfferById;
