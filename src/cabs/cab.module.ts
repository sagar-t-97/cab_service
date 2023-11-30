import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { CabController } from "./cab.controller";
import { cabProviders } from "./cab.provider";
import { CabService } from "./cab.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [CabController],
    providers: [
        ...cabProviders,
        CabService
    ],
    exports: [CabService]
})
export class CabModule { };
