import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CabController } from "./cab.controller";
import { cabProviders } from "./cab.provider";
import { CabService } from "./cab.service";

@Module({
    imports: [DatabaseModule],
    controllers: [CabController],
    providers: [
        ...cabProviders,
        CabService
    ]
})
export class CabModule { };
