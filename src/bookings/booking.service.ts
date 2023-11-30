import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./createBooking.dto";
import { CabService } from "src/cabs/cab.service";

@Injectable()
export class BookingService {
    constructor(
        @Inject("BOOKING_REPOSITORY")
        private bookingRepository: Repository<Booking>,
        private readonly cabService: CabService
    ) { }

    async findByUser(userId: number): Promise<Booking[]> {
        const bookings = await this.bookingRepository.find({
            where: {
                userId
            },
            order: {
                bookingTime: "DESC"
            }
        });
        return bookings;
    }

    async createNewBooking(userId: number, createBookingDto: CreateBookingDto): Promise<Booking> {
        const pickupLoc = createBookingDto.pickupLoc;
        const dropLoc = createBookingDto.dropLoc;
        const cab = await this.cabService.findById(createBookingDto.cabId);
        if (cab && cab.active && !cab.onTrip) {
            const booking = this.bookingRepository.create({
                userId: userId,
                cabId: cab.id,
                bookingTime: new Date(),
                pickupLoc: `POINT(${pickupLoc.x} ${pickupLoc.y})`,
                dropLoc: `POINT(${dropLoc.x} ${dropLoc.y})`
            });
            const savedBooking = await this.bookingRepository.save(booking);
            return savedBooking;
        }
        return null;
    }
}
