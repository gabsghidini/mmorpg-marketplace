import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PlayerProvider } from "./context/Players.context.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<PlayerProvider>
			<App />
		</PlayerProvider>
	</StrictMode>
);
