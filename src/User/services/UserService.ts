import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Users } from "../entities/Users";
import * as md5 from 'md5';
import { DataResult } from "src/Common/data/DataResult";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "../dto/UserDto";

@Injectable()
export class UserService {

  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<Users>,
  ) {}

  async getListUser(limit: number, page: number, keyword?: string): Promise<DataResult<Users>> {
    try {

      const whereStatement = keyword ? { name: new RegExp(keyword, 'i') } : null;
      const skip = page == 1 ? page-1 : (page-1) * limit;
      const result = await this.userModel.find(whereStatement).limit(limit).skip(skip).exec();

      return {
        data: result,
        page,
        limit: limit,
        sizeData: result.length
      };

    } catch (err) {
      throw new HttpException("Sorry can't get list of user", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(user: UserDto): Promise<Users> {

    try {

      const checkUsername = await this.userModel.findOne({username: user.username});

      if(checkUsername) throw new HttpException("Sorry user can't be created, username is exist", HttpStatus.INTERNAL_SERVER_ERROR);

      // convert md5
      user.password = md5(user.password);

      const createdUser = new this.userModel(user).save();

      if(!createdUser) {
        throw new HttpException("Sorry user can't be created", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return createdUser;

    } catch(err) {
      throw err;
    }
  }

}
