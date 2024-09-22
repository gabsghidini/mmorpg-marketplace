import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PlayerProvider } from "./context/Players.context.tsx";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./globals.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<PlayerProvider>
				<App />
				<GlobalStyle />
			</PlayerProvider>
		</BrowserRouter>
	</StrictMode>
);
