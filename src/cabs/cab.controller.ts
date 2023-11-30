import { Body, Controller, Get, Post } from "@nestjs/common";
import { CabService } from "./cab.service";
import { CreateCabDto } from "./createCab.dto";
import { Cab } from "./cab.entity";

@Controller("/cab")
export class CabController {
    constructor(
        private readonly cabService: CabService
    ) { }

    @Post()
    async createCab(@Body() createCabDto: CreateCabDto): Promise<Cab> {
        const cab = await this.cabService.create(createCabDto);
        return cab;
    }

    @Get("/available")
    async getAvailableCabs(): Promise<Cab[]> {
        const cabs = await this.cabService.findAvailable();
        return cabs;
    }
}
