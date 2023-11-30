export class Coordinates {
    x: number;
    y: number;
}

export class CreateBookingDto {
    cabId: number;
    pickupLoc: Coordinates;
    dropLoc: Coordinates;
}
