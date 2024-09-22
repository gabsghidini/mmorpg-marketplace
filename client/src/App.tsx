import AppRouter from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<AppRouter />
			<Toaster
				position="top-right"
				reverseOrder={false}
				toastOptions={{
					duration: 2000,
				}}
			/>
		</>
	);
}

export default App;
