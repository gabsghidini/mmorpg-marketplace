import { createContext, useEffect, useState } from "react";
import { Children } from "../interfaces/general";
import * as i from "../interfaces/player";
import { Item } from "../interfaces/item";
import { Offer } from "../interfaces/offer";
import { api } from "../service/instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext({} as i.GeneralContext);

export const GeneralContextProvider = ({ children }: Children) => {
	const [player, setPlayer] = useState<i.Player>({} as i.Player);
	const [playerList, setPlayerList] = useState<i.Player[]>([]);
	const [itemList, setItemList] = useState([] as Item[]);
	const [offerList, setOfferList] = useState([] as Offer[]);

	const navigate = useNavigate();

	useEffect(() => {
		getAllPlayers();
		getAllItems();
		getAllOffers();
	}, []);

	/* ------ PLAYERS ------ */
	/* READ */
	const getAllPlayers = async () => {
		try {
			const response = await api.get("/player");

			setPlayerList(response.data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An error occurred. Please try again later.");
			}
		}
	};

	const getPlayerById = async (id: string) => {
		try {
			const response = await api.get(`/player/${id}`);

			setPlayer(response.data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An error occurred. Please try again later.");
			}
		}
	};

	/* SUPPORT FUNCTIONS */
	const impersonatePlayer = async (id: string) => {
		try {
			await getPlayerById(id);

			toast.success("Impersonated successfully.");

			navigate("/dashboard");
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An error occurred. Please try again later.");
			}
		}
	};

	/* ------ ITEM ------ */
	/* READ */
	const getAllItems = async () => {
		try {
			const response = await api.get("/item");

			setItemList(response.data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An error occurred. Please try again later.");
			}
		}
	};

	/* ------ OFFER ------ */
	/* CREATE */
	const createOffer = async (offer: Offer, playerId: string) => {
		const item = itemList.find((item) => item.name === offer.item.itemName);

		const formattedOffer = {
			playerId: playerId,
			itemId: item.id,
			quantity: offer.quantity,
			pricePerUnit: offer.pricePerUnit,
			type: offer.type,
			endDate: offer.endDate,
		};

		try {
			await api.post("/offer", formattedOffer);

			toast.success("Offer created successfully.");

			getAllOffers();
			getPlayerById(playerId);
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An error occurred. Please try again later.");
			}
		}
	};

	/* READ */
	const getAllOffers = async () => {
		try {
			const response = await api.get("/offer");

			setOfferList(response.data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error("An error occurred. Please try again later.");
			}
		}
	};

	return (
		<GeneralContext.Provider
			value={{
				player,
				setPlayer,
				playerList,
				getAllPlayers,
				getPlayerById,
				impersonatePlayer,
				getAllItems,
				itemList,
				offerList,
				createOffer,
			}}
		>
			{children}
		</GeneralContext.Provider>
	);
};
