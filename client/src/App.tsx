import { useContext } from "react";
import { PlayerContext } from "./context/Players.context";
import { Player } from "./interfaces/player";

function App() {
	const { playerList } = useContext(PlayerContext);

	return (
		<>
			<h1>Player to Impersonate</h1>
			<select>
				{playerList.map((player: Player) => (
					<option key={player.id}>{player.nickname}</option>
				))}
			</select>
			<button>Impersonate</button>
		</>
	);
}

export default App;
