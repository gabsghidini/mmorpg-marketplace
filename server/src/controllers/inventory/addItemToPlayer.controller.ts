import { Request, Response } from "express";
import { Item } from "../../entities/item";
import { addItemToPlayerService } from "../../services";

const addItemToPlayer = async (req: Request, res: Response) => {
	const playerId = req.params.id;
	const { itemId, quantity } = req.body;

	try {
		const inventory = await addItemToPlayerService(
			playerId,
			itemId,
			quantity
		);
		return res.status(201).json(inventory);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

export default addItemToPlayer;
