import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                legacySpatialSupport: false,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
            });

            return dataSource.initialize();
        },
        inject: [ConfigService]
    }
];
