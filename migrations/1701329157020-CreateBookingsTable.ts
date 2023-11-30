import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateBookingsTable1701329157020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE bookings(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                cab_id INT NOT NULL,
                booking_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                pickup_loc POINT NOT NULL SRID 3857,
                drop_loc POINT NOT NULL SRID 3857,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (cab_id) REFERENCES cabs(id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE bookings;`);
    }

}
