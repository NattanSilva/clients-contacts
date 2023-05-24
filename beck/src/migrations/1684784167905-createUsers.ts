import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1684784167905 implements MigrationInterface {
    name = 'CreateUsers1684784167905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "completeName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tellphone" character varying NOT NULL, "secondEmail" character varying, "secondTellphone" character varying, CONSTRAINT "UQ_d3e6ebb97d5eba99a4b2eb52e5a" UNIQUE ("completeName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_9a3f55a6306feaf5d8596cdc383" UNIQUE ("tellphone"), CONSTRAINT "UQ_58bb5282b651da06899a3979426" UNIQUE ("secondEmail"), CONSTRAINT "UQ_d2b4c7049ecf44de0791e0d7e06" UNIQUE ("secondTellphone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
