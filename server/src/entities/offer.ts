import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { Player } from "./player";
import { Item } from "./item";

@Entity()
export class Offer {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Player, (player) => player.offers, { onDelete: "CASCADE" })
	@JoinColumn({ name: "player_id" })
	player: Player;

	@ManyToOne(() => Item, (item) => item.offers, { onDelete: "CASCADE" })
	@JoinColumn({ name: "item_id" })
	item: Item;

	@Column({ type: "enum", enum: ["buy", "sell"] })
	type: "buy" | "sell";

	@Column({ type: "int" })
	quantity: number;

	@Column({ type: "int" })
	pricePerUnit: number;

	@Column({ type: "int" })
	totalPrice: number;

	@Column({ type: "timestamp" })
	endDate: Date;
}
