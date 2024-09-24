import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
	addItemToSellPlayer,
	healthPotion,
	manaPotion,
	player1,
	shield,
	sword,
} from "../../mocks";

describe("/items", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res;
			})
			.catch((err) => {
				console.error("Error during Data Source initialization", err);
			});
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("POST /item - should create a new item", async () => {
		const response = await request(app).post("/item").send(healthPotion);
		healthPotion.id = response.body.id;

		const manaPotionResp = await request(app)
			.post("/item")
			.send(manaPotion);
		manaPotion.id = manaPotionResp.body.id;

		const shieldResp = await request(app).post("/item").send(shield);
		shield.id = shieldResp.body.id;

		const swordResp = await request(app).post("/item").send(sword);
		sword.id = swordResp.body.id;

		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("name", healthPotion.name);
		expect(response.status).toBe(201);
	});

	test("POST /item - should return 400 if name is missing", async () => {
		const response = await request(app).post("/item").send({});
		expect(response.status).toBe(400);
	});

	test("GET /item - should return a list of items", async () => {
		const response = await request(app).get("/item");
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(4);
		expect(response.body[0]).toHaveProperty("id");
	});

	test("GET /item/:id - should return an item by id", async () => {
		const response = await request(app).get(`/item/${healthPotion.id}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", healthPotion.id);
	});

	test("PATCH /item/:id - should update an item by id", async () => {
		const response = await request(app)
			.patch(`/item/${healthPotion.id}`)
			.send({ name: "Super Health Potion" });

		expect(response.status).toBe(200);
	});

	test("DELETE /item/:id - should delete an item by id", async () => {
		const response = await request(app).delete(`/item/${manaPotion.id}`);
		expect(response.status).toBe(204);

		const items = await request(app).get("/item");
		expect(items.body).toHaveLength(3);
	});

	test("GET /item/:id - should return 404 if item is not found", async () => {
		const response = await request(app).get(`/item/123`);
		expect(response.status).toBe(404);
	});

	test("PATCH /item/:id - should return 404 if item is not found", async () => {
		const response = await request(app).patch(`/item/123`).send({});
		expect(response.status).toBe(404);
	});
});
