import { DataSource } from "typeorm";
import { Cab } from "./cab.entity";

export const cabProviders = [
    {
        provide: "CAB_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Cab),
        inject: ["DATA_SOURCE"],
    },
];
