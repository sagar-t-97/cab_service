import { Body, Controller, Get, Param, Patch, Post, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { CabService } from "./cab.service";
import { CreateCabDto } from "./createCab.dto";
import { Cab } from "./cab.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { UserRole } from "src/users/user.entity";
import { Coordinates } from "src/bookings/createBooking.dto";
import { NearLocationDto } from "./nearLocation.dto";

@Controller("/cab")
export class CabController {
    constructor(
        private readonly cabService: CabService
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    async createCab(
        @Req() req: any,
        @Body() createCabDto: CreateCabDto
    ): Promise<Cab> {
        if (req.user.role != UserRole.DRIVER) {
            throw new UnauthorizedException();
        }
        const cab = await this.cabService.create(
            Number(req.user.sub), createCabDto
        );
        return cab;
    }

    @Get("/available")
    async getAvailableCabs(): Promise<Cab[]> {
        const cabs = await this.cabService.findAvailable();
        return cabs;
    }

    @UseGuards(AuthGuard)
    @Patch("/:id")
    async updateLocation(
        @Req() req: any,
        @Param("id") id: string,
        @Body() location: Coordinates
    ): Promise<Cab> {
        if (req.user.role != UserRole.DRIVER) {
            throw new UnauthorizedException();
        }

        const cabId = Number(id);
        const cab = await this.cabService.updateLocation(
            Number(req.user.sub),
            cabId,
            location
        );

        return cab;
    }

    @Get("/near")
    async getNearby(@Query() nearLocation: NearLocationDto): Promise<any[]> {
        nearLocation.x = Number(nearLocation.x);
        nearLocation.y = Number(nearLocation.y);
        nearLocation.page = Number(nearLocation.page);
        nearLocation.size = Number(nearLocation.size);
        const cabs = await this.cabService.findNearLocation(nearLocation);
        return cabs;
    }
}
