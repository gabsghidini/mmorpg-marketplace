import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Inventory } from "./inventory";
import { Offer } from "./offer";

@Entity()
export class Player {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	nickname: string;

	@Column({ type: "int", default: 0 })
	gold: number;

	@OneToMany(() => Inventory, (inventory) => inventory.player)
	inventory: Inventory[];

	@OneToMany(() => Offer, (offer) => offer.player)
	offers: Offer[];
}
