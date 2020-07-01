import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Sellers } from "../entities/Sellers";
import * as md5 from 'md5';
import { DataResult } from "src/Common/data/DataResult";
import { Like, FindManyOptions } from "typeorm";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SellerDto } from "../dto/SellerDto";

@Injectable()
export class SellerService {

  constructor(
    @InjectModel(Sellers.name)
    private readonly sellerModel: Model<Sellers>,
  ) {}

  async getListSeller(limit: number, page: number, keyword?: string): Promise<DataResult<Sellers>> {
    try {

      const whereStatement = keyword ? { name: new RegExp(keyword, 'i') } : null;
      const skip = page == 1 ? page-1 : (page-1) * limit;
      const result = await this.sellerModel.find(whereStatement).limit(limit).skip(skip).exec();

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

  async createSeller(seller: SellerDto): Promise<Sellers> {
    try {

      const checkUsername = await this.sellerModel.findOne({username: seller.username});

      if(checkUsername) throw new HttpException("Sorry user can't be created, username is exist", HttpStatus.INTERNAL_SERVER_ERROR);

      // convert md5
      seller.password = md5(seller.password);

      const createdUser = new this.sellerModel(seller).save();

      if(!createdUser) {
        throw new HttpException("Sorry user can't be created", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return createdUser;

    } catch(err) {
      throw err;
    }
  }

  // async createSeller(seller: Seller): Promise<Seller> {
  //   try {

  //     const checkUsername = await this.sellerRepository.findOne({username: seller.username});

  //     if(checkUsername) throw new HttpException("Sorry seller can't be created, username is exist", HttpStatus.INTERNAL_SERVER_ERROR);

  //     const newUser = new Seller();
  //     newUser.name = seller.name;
  //     newUser.username = seller.username;
  //     newUser.password = md5(seller.password);

  //     const result = await this.sellerRepository.save(newUser);

  //     if(!result) {
  //       throw new HttpException("Sorry sller can't be created", HttpStatus.INTERNAL_SERVER_ERROR);
  //     }

  //     return result;

  //   } catch (err) {
  //     throw err;
  //   }
  // }

}
