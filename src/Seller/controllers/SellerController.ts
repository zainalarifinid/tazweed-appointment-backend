import { SELLER_SERVICE } from "../constants";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { Controller, Inject, Get, Req, Post, Body } from "@nestjs/common";
import { Sellers } from "../entities/Sellers";
import { SellerService } from "../services/SellerService";
import { DataResult } from "src/Common/data/DataResult";
import { SellerDto } from "../dto/SellerDto";

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
  async get(@Req() request): Promise<DataResult<Sellers>> {
    return this.sellerService.getListSeller(
      request.query.hasOwnProperty('limit') ? parseInt(request.query.limit) : 10,
      request.query.hasOwnProperty('page') ? parseInt(request.query.page) : 1
    );
  }

  @Get('/search')
  @ApiOperation({
    summary: 'Get List Seller',
    description: 'The API to get list of User'
  })
  @ApiQuery({
    name: 'keyword',
    example: 'zai'
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
  async search(@Req() request): Promise<DataResult<Sellers>> {

    return this.sellerService.getListSeller(
      request.query.hasOwnProperty('limit') ? parseInt(request.query.limit) : 10,
      request.query.hasOwnProperty('page') ? parseInt(request.query.page) : 1,
      request.query.hasOwnProperty('keyword') ? request.query.keyword : '',
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create User',
    description: 'The API for create User'
  })
  async create(@Body() seller: SellerDto): Promise<Sellers> {
    return this.sellerService.createSeller(seller);
  }

}
