import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cabs" })
export class Cab {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "driver_id" })
    driverId: number;

    @Column({ name: "number" })
    number_: number;

    @Column()
    model: string;

    @Column({ name: "on_trip" })
    onTrip: boolean;

    @Column()
    active: boolean;

    @Column({ type: "point", srid: 3857 })
    location: string;
}
