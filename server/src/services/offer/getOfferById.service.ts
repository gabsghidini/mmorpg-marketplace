import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

const getOfferByIdService = async (offer_id: string): Promise<i.Offer> => {
	const offerRepository = AppDataSource.getRepository(Offer);

	const offer = await offerRepository.findOneBy({
		id: offer_id,
	});

	return offer;
};

export default getOfferByIdService;
