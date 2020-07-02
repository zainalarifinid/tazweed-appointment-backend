import { AppointmentService } from "../services/AppointmentService";
import { APPOINTMENT_SERVICE } from "../constants";
import { Inject, Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AppointmentDto } from "../dto/AppointmentDto";
import { Appointments } from "../entities/Appointments";

@ApiTags('Appointment')
@Controller('/api/appointment')
export class AppointmentController {

  constructor(
    @Inject(APPOINTMENT_SERVICE)
    private readonly appointmentService: AppointmentService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create Appointment',
    description: 'The API for create Appointment'
  })
  async create(@Body() appointment: AppointmentDto): Promise<Appointments> {
    return this.appointmentService.createAppointment(appointment);
  }
}
