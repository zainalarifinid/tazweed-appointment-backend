import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seller } from "../entities/Seller";
import { SellerRepository } from "../repositories/SellerRepository";
import * as md5 from 'md5';
import { DataResult } from "src/Common/data/DataResult";

@Injectable()
export class SellerService {

  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: SellerRepository,
  ) {}

  async getListSeller(take: number, page: number): Promise<DataResult<Seller>> {
    try {
      const optionGetData = { take, skip: page == 1 ? page-1 : (page-1) * 10 };
      const result = await this.sellerRepository.find(optionGetData);

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

  async createSeller(seller: Seller): Promise<Seller> {
    try {

      const checkUsername = await this.sellerRepository.findOne({username: seller.username});

      if(checkUsername) throw new HttpException("Sorry seller can't be created, username is exist", HttpStatus.INTERNAL_SERVER_ERROR);

      const newUser = new Seller();
      newUser.name = seller.name;
      newUser.username = seller.username;
      newUser.password = md5(seller.password);

      const result = await this.sellerRepository.save(newUser);

      if(!result) {
        throw new HttpException("Sorry sller can't be created", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return result;

    } catch (err) {
      throw err;
    }
  }

}
