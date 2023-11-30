import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateCabsTable1701320613351 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE cabs(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                driver_id INT NOT NULL,
                number VARCHAR(10) NOT NULL UNIQUE,
                model VARCHAR(32) NOT NULL,
                on_trip BOOLEAN NOT NULL DEFAULT false,
                active BOOLEAN NOT NULL DEFAULT true,
                FOREIGN KEY (driver_id) REFERENCES users(id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE cabs`);
    }

}
