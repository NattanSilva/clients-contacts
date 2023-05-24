import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1684942793751 implements MigrationInterface {
    name = 'CreateUsers1684942793751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "completeName" character varying NOT NULL, "email" character varying NOT NULL, "tellphone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "secondEmail" character varying, "secondTellphone" character varying, "ownerId" uuid, CONSTRAINT "UQ_4ded6cd0cb47c9ea4996e122056" UNIQUE ("completeName"), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "UQ_253a4ea77db1090410bceef5f34" UNIQUE ("tellphone"), CONSTRAINT "UQ_b746c6cf6b3987ea1976054e23e" UNIQUE ("secondEmail"), CONSTRAINT "UQ_0767bbeb0374e02b9e4737f03b0" UNIQUE ("secondTellphone"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_270a85b7f2d4b6821dc7642e6a8" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_270a85b7f2d4b6821dc7642e6a8"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
