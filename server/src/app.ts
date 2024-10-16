import "express-async-errors";
import "reflect-metadata";
import express from "express";
import {
	inventoryRouter,
	itemRouter,
	offerRoutes,
	playerRouter,
} from "./routes";
import errorHandler from "./errors";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/inventory", inventoryRouter);
app.use("/item", itemRouter);
app.use("/offer", offerRoutes);
app.use("/player", playerRouter);
app.use(errorHandler);

export default app;
