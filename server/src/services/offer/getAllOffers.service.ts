import AppDataSource from "../../data-source";
import { Offer } from "../../entities/offer";
import * as i from "../../interfaces/offer";

const getAllOffersService = async (): Promise<i.Offer[]> => {
	const offerRepository = AppDataSource.getRepository(Offer);

	const offers = await offerRepository.find();

	return offers;
};

export default getAllOffersService;
