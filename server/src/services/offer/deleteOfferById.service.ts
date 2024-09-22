import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

const deleteOfferByIdService = async (offer_id: string): Promise<void> => {
	const offerRepository = AppDataSource.getRepository(Offer);

	const offer = await offerRepository.findOneBy({
		id: offer_id,
	});

	await offerRepository.delete(offer);

	return;
};

export default deleteOfferByIdService;
