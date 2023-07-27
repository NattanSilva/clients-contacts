import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1690421689111 implements MigrationInterface {
    name = 'CreateUsers1690421689111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_270a85b7f2d4b6821dc7642e6a8"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_270a85b7f2d4b6821dc7642e6a8" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_270a85b7f2d4b6821dc7642e6a8"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_270a85b7f2d4b6821dc7642e6a8" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
