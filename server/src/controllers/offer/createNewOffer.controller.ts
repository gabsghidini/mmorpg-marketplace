import { Request, Response } from "express";
import { createSellOfferService, createBuyOfferService } from "../../services";

const createNewOffer = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { playerId, itemId, quantity, pricePerUnit, type, endDate } =
		req.body;

	try {
		let offer;
		if (type === "sell") {
			offer = await createSellOfferService(
				playerId,
				itemId,
				quantity,
				pricePerUnit,
				new Date(endDate)
			);
		} else if (type === "buy") {
			offer = await createBuyOfferService(
				playerId,
				itemId,
				quantity,
				pricePerUnit,
				new Date(endDate)
			);
		} else {
			throw new Error("Invalid offer type");
		}

		return res.status(201).json(offer);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default createNewOffer;
