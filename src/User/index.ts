
import { Module } from '@nestjs/common';
import { UserSchema, Users } from './entities/Users';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { USER_SERVICE } from './constants';
import { MongooseModule } from '@nestjs/mongoose/dist';

const userServiceProvider = {
  provide: USER_SERVICE,
  useClass: UserService,
}

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [ userServiceProvider ],
})

export class UserModule {}
