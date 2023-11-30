import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { BookingController } from "./booking.controller";
import { bookingProviders } from "./booking.provider";
import { BookingService } from "./booking.service";
import { CabModule } from "src/cabs/cab.module";

@Module({
    imports: [DatabaseModule, CabModule],
    controllers: [BookingController],
    providers: [
        ...bookingProviders,
        BookingService
    ]
})
export class BookingModule { }
