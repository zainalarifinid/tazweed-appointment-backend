import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User';
import { SellerModule } from './Seller';
import { configServiceMongo } from './Config/configServiceMongo';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppointmentModule } from './Appointment';

@Module({
  imports: [
    MongooseModule.forRoot(configServiceMongo.getMongoConfig()),
    UserModule,
    SellerModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
