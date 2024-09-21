import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Inventory } from "./inventory";
import { Offer } from "./offer";

@Entity()
export class Item {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@OneToMany(() => Inventory, (inventory) => inventory.item)
	inventory: Inventory[];

	@OneToMany(() => Offer, (offer) => offer.item)
	offers: Offer[];
}
