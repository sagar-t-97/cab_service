import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./createBooking.dto";

@Controller("/booking")
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @UseGuards(AuthGuard)
    @Get()
    async getUserBookings(@Req() req: any): Promise<Booking[]> {
        const userId = req.user.sub;
        const bookings = await this.bookingService.findByUser(userId);
        return bookings;
    }

    @UseGuards(AuthGuard)
    @Post()
    async createBooking(
        @Req() req: any,
        @Body() createBookingDto: CreateBookingDto
    ): Promise<Booking> {
        const userId = req.user.sub;
        const booking = await this.bookingService.createNewBooking(userId, createBookingDto);
        return booking;
    }
}
