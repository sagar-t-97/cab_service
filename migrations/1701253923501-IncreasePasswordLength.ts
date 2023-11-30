import { MigrationInterface, QueryRunner } from "typeorm"

export class IncreasePasswordLength1701253923501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users MODIFY COLUMN password VARCHAR(64)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users MODIFY COLUMN password VARCHAR(32)`
        );
    }

}
