import { Request, Response } from "express";
import { Offer } from "../../entities/offer";
import { deleteOfferByIdService } from "../../services";

const deleteOfferById = async (req: Request, res: Response) => {
	const { id } = req.params;

	await deleteOfferByIdService(id);

	res.status(204).json();
};

export default deleteOfferById;
