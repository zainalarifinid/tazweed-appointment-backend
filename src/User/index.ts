
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/UserRepository';
import { User } from './entities/User';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { USER_SERVICE } from './constants';

const userServiceProvider = {
  provide: USER_SERVICE,
  useClass: UserService,
}

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [UserController],
  providers: [ userServiceProvider ],
  exports: [ userServiceProvider ]
})

export class UserModule {}
