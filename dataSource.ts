import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        '**/*.entity.{ts,js}',
    ],
    migrations: [
        'migrations/*.{ts,js}'
    ]
})

export default AppDataSource;
