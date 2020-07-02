import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appointments } from "../entities/Appointments";
import { Model } from "mongoose";
import { AppointmentDto } from "../dto/AppointmentDto";
import { Users } from "src/User/entities/Users";
import { Sellers } from "src/Seller/entities/Sellers";

@Injectable()
export class AppointmentService {

  constructor(
    @InjectModel(Appointments.name)
    private readonly appointmentModel: Model<Appointments>,
    @InjectModel(Users.name)
    private readonly userModel: Model<Users>,
    @InjectModel(Sellers.name)
    private readonly sellerModel: Model<Sellers>,
  ) {}

  async createAppointment(appointment: AppointmentDto): Promise<Appointments> {

    try {
      const dataUser = await this.userModel.findOne({_id: appointment.idUser}).exec();
      const dataSeller = await this.sellerModel.findOne({_id: appointment.idSeller}).exec();

      if(!dataUser || !dataSeller) {
        throw new HttpException("Sorry appointment can't be created, User / Seller not found", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const createdAppointment = await new this.appointmentModel(appointment).save();

      if(!this.createAppointment) {
        throw new HttpException("Sorry appointment can't be created", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      dataUser.appointments.push(createdAppointment);
      dataSeller.appointments.push(createdAppointment);
      
      await this.userModel.update({ _id: appointment.idUser }, dataUser);
      await this.sellerModel.update({ _id:appointment.idSeller }, dataSeller);

      return createdAppointment;

    } catch (err) {
      throw err;
    }

  }

}
