
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Appointments, AppointmentSchema } from "./entities/Appointments";
import { AppointmentController } from "./controllers/AppointmentController";
import { APPOINTMENT_SERVICE } from "./constants";
import { AppointmentService } from "./services/AppointmentService";
import { Users, UserSchema } from "src/User/entities/Users";
import { Sellers, SellerSchema } from "src/Seller/entities/Sellers";

const appointmentServiceProvider = {
  provide: APPOINTMENT_SERVICE,
  useClass: AppointmentService,
}

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointments.name, schema: AppointmentSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Sellers.name, schema: SellerSchema }]),
  ],
  controllers: [AppointmentController],
  providers: [appointmentServiceProvider],
})

export class AppointmentModule {}
