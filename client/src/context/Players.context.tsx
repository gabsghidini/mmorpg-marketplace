import { createContext, useEffect, useState } from "react";
import { Children } from "../interfaces/general";
import * as i from "../interfaces/player";
import { api } from "../service/instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const PlayerContext = createContext({} as i.PlayerContext);

export const PlayerProvider = ({ children }: Children) => {
	const [player, setPlayer] = useState<i.Player>({} as i.Player);
	const [playerList, setPlayerList] = useState<i.Player[]>([]);

	const navigate = useNavigate();

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

	/* UPDATE */

	/* DELETE */

	/* SUPORT FUNCTIONS */
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

	return (
		<PlayerContext.Provider
			value={{
				player,
				setPlayer,
				playerList,
				getAllPlayers,
				getPlayerById,
				impersonatePlayer,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};
