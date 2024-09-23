import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { player1, player2 } from "../../mocks";

describe("/players", () => {
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

	test("POST /player - should create a new player", async () => {
		const response = await request(app).post("/player").send(player1);
		player1.id = response.body.id;

		const player2resp = await request(app).post("/player").send(player2);
		player2.id = player2resp.body.id;

		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("nickname", player1.nickname);
		expect(response.body).toHaveProperty("gold", 0);
		expect(response.status).toBe(201);
	});

	test("POST /player - should return 400 if nickname is missing", async () => {
		const response = await request(app).post("/player").send({});
		expect(response.status).toBe(400);
	});

	test("GET /player - should return a list of players", async () => {
		const response = await request(app).get("/player");
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(2);
		expect(response.body[0]).toHaveProperty("id", player1.id);
	});

	test("GET /player/:id - should return a player by id", async () => {
		const response = await request(app).get(`/player/${player1.id}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", player1.id);
	});

	test("PATCH /player/:id - should update a player by id", async () => {
		const response = await request(app)
			.patch(`/player/${player1.id}`)
			.send({ gold: 100 });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("gold", 100);
	});

	test("DELETE /player/:id - should delete a player by id", async () => {
		const response = await request(app).delete(`/player/${player2.id}`);
		expect(response.status).toBe(204);

		const players = await request(app).get("/player");
		expect(players.body).toHaveLength(1);
		expect(players.body[0]).toHaveProperty("id", player1.id);
	});
});
