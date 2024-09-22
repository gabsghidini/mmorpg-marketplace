import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

const updateOfferByIdService = async (
	offer_id: string,
	updatedOffer: i.Offer
): Promise<Offer> => {
	const offerRepository = AppDataSource.getRepository(Offer);

	const offer = await offerRepository.findOneBy({
		id: offer_id,
	});

	const offerUpdated: Offer = await offerRepository.create({
		...offer,
		...updatedOffer,
	});

	await offerRepository.save(offerUpdated);

	return offerUpdated;
};

export default updateOfferByIdService;
