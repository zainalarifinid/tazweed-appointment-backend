import { SELLER_SERVICE } from "../constants";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { Controller, Inject, Get, Req, Post, Body } from "@nestjs/common";
import { Seller } from "../entities/Seller";
import { SellerService } from "../services/SellerService";
import { DataResult } from "src/Common/data/DataResult";

@ApiTags('Seller')
@Controller('/api/sellers')
export class SellerController {

  constructor(
    @Inject(SELLER_SERVICE)
    private sellerService: SellerService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get List Seller',
    description: 'The API to get list of User'
  })
  @ApiQuery({
    name: 'limit',
    example: 10
  })
  @ApiQuery({
    name: 'page',
    example: 1
  })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async get(@Req() request): Promise<DataResult<Seller>> {
    return this.sellerService.getListSeller(
      request.query.hasOwnProperty('limit') ? parseInt(request.query.limit) : 10,
      request.query.hasOwnProperty('page') ? parseInt(request.query.page) : 1
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create User',
    description: 'The API for create User'
  })
  async create(@Body() seller: Seller): Promise<Seller> {
    return this.sellerService.createSeller(seller);
  }

}
