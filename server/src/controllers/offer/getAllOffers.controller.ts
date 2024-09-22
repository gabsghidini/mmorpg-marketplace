import { Request, Response } from "express";
import { Offer } from "../../entities/offer";
import { getAllOffersService } from "../../services";

const getAllOffers = async (req: Request, res: Response) => {
	const offers: Offer[] = await getAllOffersService();

	res.status(200).json(offers);
};

export default getAllOffers;
