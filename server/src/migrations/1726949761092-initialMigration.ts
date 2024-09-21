import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726949761092 implements MigrationInterface {
    name = 'InitialMigration1726949761092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."offer_type_enum" AS ENUM('buy', 'sell')`);
        await queryRunner.query(`CREATE TABLE "offer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."offer_type_enum" NOT NULL, "quantity" integer NOT NULL, "pricePerUnit" integer NOT NULL, "totalPrice" integer NOT NULL, "endDate" TIMESTAMP NOT NULL, "player_id" uuid, "item_id" uuid, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying NOT NULL, "gold" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_c28e07e62591410385846072b66" UNIQUE ("nickname"), CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "player_id" uuid, "item_id" uuid, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_c6ae12601fed4e2ee5019544ddf" UNIQUE ("name"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_1d2e6424f390df234c2ed3ea033" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_9cf0fd59801452942a29e0ecc02" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_3035ce189ae7793e0dca6db9bb2" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_94f5cbcb5f280f2f30bd4a9fd90" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_94f5cbcb5f280f2f30bd4a9fd90"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_3035ce189ae7793e0dca6db9bb2"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_9cf0fd59801452942a29e0ecc02"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_1d2e6424f390df234c2ed3ea033"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TYPE "public"."offer_type_enum"`);
    }

}
