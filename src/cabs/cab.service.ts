import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateCabDto } from "./createCab.dto";
import { Cab } from "./cab.entity";

@Injectable()
export class CabService {
    constructor(
        @Inject("CAB_REPOSITORY")
        private cabRepository: Repository<Cab>
    ) { }

    async create(createCabDto: CreateCabDto): Promise<Cab> {
        const cab = this.cabRepository.create({
            ...createCabDto,
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
}
