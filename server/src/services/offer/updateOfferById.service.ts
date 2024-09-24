import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

/**
 * Updates an existing offer by its ID with the provided updated offer data.
 *
 * @param offerId - The ID of the offer to be updated.
 * @param updatedOffer - An object containing the updated offer data.
 * @returns A promise that resolves to the updated offer.
 *
 * @throws Will throw an error if the offer with the specified ID is not found.
 */
const updateOfferByIdService = async (
	offerId: string,
	updatedOffer: i.Offer
): Promise<Offer> => {
	const offerRepository = AppDataSource.getRepository(Offer);

	const offer = await offerRepository.findOneBy({
		id: offerId,
	});

	const offerUpdated: Offer = await offerRepository.create({
		...offer,
		...updatedOffer,
	});

	await offerRepository.save(offerUpdated);

	return offerUpdated;
};

export default updateOfferByIdService;
