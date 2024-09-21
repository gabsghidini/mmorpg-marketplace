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
export class Inventory {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Player, (player) => player.inventory, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "player_id" })
	player: Player;

	@ManyToOne(() => Item, (item) => item.inventory, { onDelete: "CASCADE" })
	@JoinColumn({ name: "item_id" })
	item: Item;

	@Column({ type: "int" })
	quantity: number;
}
