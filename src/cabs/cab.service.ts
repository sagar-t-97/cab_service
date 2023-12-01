import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateCabDto } from "./createCab.dto";
import { Cab } from "./cab.entity";
import { Coordinates } from "src/bookings/createBooking.dto";
import { NearLocationDto } from "./nearLocation.dto";

@Injectable()
export class CabService {
    constructor(
        @Inject("CAB_REPOSITORY")
        private cabRepository: Repository<Cab>
    ) { }

    async create(driverId: number, createCabDto: CreateCabDto): Promise<Cab> {
        const cab = this.cabRepository.create({
            ...createCabDto,
            driverId,
            onTrip: false,
            active: true,
        });
        const savedCab = await this.cabRepository.save(cab);
        return savedCab;
    }

    async findAvailable(): Promise<Cab[]> {
        const cabs = await this.cabRepository.find({
            where: {
                active: true,
                onTrip: false
            }
        });
        return cabs;
    }

    async findById(cabId: number): Promise<Cab> {
        const cab = await this.cabRepository.findOne({
            where: {
                id: cabId
            }
        })
        return cab;
    }

    async updateLocation(
        driverId: number,
        cabId: number,
        location: Coordinates
    ): Promise<Cab> {
        const cab = await this.cabRepository.findOne({
            where: {
                id: cabId
            }
        });

        if (!cab) {
            return null;
        }

        if (cab.driverId != driverId) {
            throw new UnauthorizedException();
        }

        cab.location = `POINT(${location.x} ${location.y})`;
        const updatedCab = await this.cabRepository.save(cab);

        return updatedCab;
    }

    async findNearLocation(nearLocation: NearLocationDto): Promise<any[]> {
        const locationString = `POINT(${nearLocation.x} ${nearLocation.y})`;
        const cabs = await this.cabRepository
            .createQueryBuilder("cab")
            .select(`id, number, model, location,
                    ST_Distance(location, ST_GeomFromText('${locationString}',3857)) as distance`)
            .where("active = true")
            .andWhere("on_trip = false")
            .orderBy("distance", "ASC")
            .skip(nearLocation.page * nearLocation.size)
            .take(nearLocation.size)
            .getRawMany();
        return cabs;
    }
}
