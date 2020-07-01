
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { Controller, Post, Body, Inject, Param, Get, Req } from "@nestjs/common";
import { Users } from "../entities/Users";
import { UserService } from "../services/UserService";
import { UserDto } from "../dto/UserDto";
import { DataResult } from "src/Common/data/DataResult";
import { USER_SERVICE } from "../constants";

@ApiTags('User')
@Controller('/api/users')
export class UserController {

  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get list User',
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
  async get(@Req() request): Promise<DataResult<Users>> {
    return this.userService.getListUser(
      request.query.hasOwnProperty('limit') ? parseInt(request.query.limit) : 10,
      request.query.hasOwnProperty('page') ? parseInt(request.query.page) : 1
    );
  }

  @Get('/search')
  @ApiOperation({
    summary: 'Get filtered list User by keyword',
    description: 'The API to get filtered list of User by keyword'
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
  async search(@Req() request): Promise<DataResult<Users>> {
    return this.userService.getListUser(
      request.query.hasOwnProperty('limit') ? parseInt(request.query.limit) : 10,
      request.query.hasOwnProperty('page') ? parseInt(request.query.page) : 1,
      request.query.hasOwnProperty('keyword') ? request.query.name : ''
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create User',
    description: 'The API for create User'
  })
  async create(@Body() user: UserDto): Promise<Users> {
    return this.userService.createUser(user);
  }
}
