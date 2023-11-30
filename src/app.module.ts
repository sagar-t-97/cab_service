import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photo/photo.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { CabModule } from './cabs/cab.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PhotoModule,
        UserModule,
        AuthModule,
        CabModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
