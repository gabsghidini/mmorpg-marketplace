import { useContext } from "react";
import { PlayerContext } from "../../context/Players.context";
import { Player } from "../../interfaces/player";
import * as S from "./styles";
import toast from "react-hot-toast";

function Login() {
	const { player, setPlayer, playerList, impersonatePlayer } =
		useContext(PlayerContext);

	const handleImpersonate = () => {
		if (!player.id) {
			setPlayer(playerList[0] as Player);
		}

		impersonatePlayer(player.id as string);
	};

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const playerFound = playerList.find(
			(player: Player) => player.nickname === event.target.value
		);

		if (!playerFound) {
			return toast.error("Player not found.");
		}

		setPlayer(playerFound);
	};

	return (
		<S.Container>
			<S.Box>
				<S.Title>Player to Impersonate</S.Title>
				<S.Select onChange={(e) => handleSelectChange(e)}>
					{playerList.map((player: Player) => (
						<option key={player.id}>{player.nickname}</option>
					))}
				</S.Select>
				<S.Button onClick={() => handleImpersonate()}>
					Impersonate
				</S.Button>
			</S.Box>
		</S.Container>
	);
}

export default Login;
