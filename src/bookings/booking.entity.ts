import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "bookings" })
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "user_id" })
    userId: number;

    @Column({ name: "cab_id" })
    cabId: number;

    @Column({ name: "booking_time" })
    bookingTime: Date;

    @Column({ name: "pickup_loc", type: "point", srid: 3857 })
    pickupLoc: string;

    @Column({ name: "drop_loc", type: "point", srid: 3857 })
    dropLoc: string;
}
