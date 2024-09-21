import app from "./app";
import AppDataSource from "./data-source";
import dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize()
	.then(() => {
		console.log("Database connected successfully! 🚀");
		app.listen(process.env.APIPORT ?? 5000, () => {
			console.log(
				`Server listening on ${process.env.APIPORT ?? 5000}!😎`
			);
		});
	})
	.catch((err) => {
		console.log(err);
	});
