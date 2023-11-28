import { Controller, Get } from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { Photo } from "./photo.entity";

@Controller("/photo")
export class PhotoController {
    constructor(private readonly photoService: PhotoService) { }

    @Get()
    async getPhotos(): Promise<Photo[]> {
        const photos = await this.photoService.findAll();
        return photos;
    }
}
