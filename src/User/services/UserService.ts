import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { User } from "../entities/User";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repositories/UserRepository";
import * as md5 from 'md5';
import { DataResult } from "src/Common/data/DataResult";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async getListUser(take: number, page: number): Promise<DataResult<User>> {
    try {
      const optionGetData = { take, skip: page == 1 ? page-1 : (page-1) * 10 };
      const result = await this.userRepository.find(optionGetData);

      return {
        data: result,
        page,
        limit: take,
        sizeData: result.length
      };

    } catch (err) {
      throw new HttpException("Sorry can't get list of user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(user: User): Promise<User> {
    try {

      const checkUsername = await this.userRepository.findOne({username: user.username});

      if(checkUsername) throw new HttpException("Sorry user can't be created, username is exist", HttpStatus.INTERNAL_SERVER_ERROR);

      const newUser = new User();
      newUser.name = user.name;
      newUser.username = user.username;
      newUser.password = md5(user.password);

      const result = await this.userRepository.save(newUser);

      if(!result) {
        throw new HttpException("Sorry user can't be created", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return result;

    } catch (err) {
      throw err;
    }
  }

}
