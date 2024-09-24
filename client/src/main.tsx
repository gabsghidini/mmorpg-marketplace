import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GeneralContextProvider } from "./context/General.context.tsx";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./globals.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<GeneralContextProvider>
				<App />
				<GlobalStyle />
			</GeneralContextProvider>
		</BrowserRouter>
	</StrictMode>
);
