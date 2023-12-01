import { MigrationInterface, QueryRunner } from "typeorm"

export class AddCabLocationColumn1701408629965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE cabs ADD COLUMN location POINT SRID 3857;`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE cabs DROP COLUMN location;`
        );
    }

}
