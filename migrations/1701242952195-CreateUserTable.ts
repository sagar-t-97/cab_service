import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1701242952195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE users(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(32) NOT NULL UNIQUE,
                first_name VARCHAR(16) NOT NULL,
                last_name VARCHAR(16) NOT NULL,
                password VARCHAR(32) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                role ENUM('customer', 'driver')
            );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users;`)
    }

}
