import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

const createNewOfferService = async (newOffer: i.Offer): Promise<Offer> => {
	const offerRepository = AppDataSource.getRepository(Offer);

	const createdOffer = offerRepository.create(newOffer);

	await offerRepository.save(createdOffer);

	return createdOffer;
};

export default createNewOfferService;
