import { createContext, useEffect, useState } from "react";
//import { toast } from "react-hot-toast";
import { Children } from "../interfaces/general";
import * as i from "../interfaces/player";
import { api } from "../service/instance";
import toast from "react-hot-toast";

export const PlayerContext = createContext({} as i.PlayerContext);

export const PlayerProvider = ({ children }: Children) => {
	const [player, setPlayer] = useState<i.Player>({} as i.Player);
	const [playerList, setPlayerList] = useState<i.Player[]>([]);

	useEffect(() => {
		getAllPlayers();
	}, []);

	/* CREATE */

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

	/* UPDATE */

	/* DELETE */

	return (
		<PlayerContext.Provider
			value={{ player, setPlayer, playerList, getAllPlayers }}
		>
			{children}
		</PlayerContext.Provider>
	);
};
