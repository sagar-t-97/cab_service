import { MigrationInterface, QueryRunner } from "typeorm"

export class ChangePasswordColumnName1701266679930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users RENAME COLUMN password TO password_hash;`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users RENAME COLUMN password_hash TO password;`
        );
    }

}
