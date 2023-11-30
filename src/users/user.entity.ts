import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    CUSTOMER = "customer",
    DRIVER = "driver"
}

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ name: "first_name" })
    firstName: string;

    @Column({ name: "last_name" })
    lastName: string;

    @Column({ name: "password_hash" })
    passwordHash: string;

    @Column({ name: "created_at" })
    createdAt: Date;

    @Column()
    role: string;
}
