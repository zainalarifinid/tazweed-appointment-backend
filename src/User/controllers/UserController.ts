
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { Controller, Post, Body, Inject, Param, Get, Req } from "@nestjs/common";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";
import { USER_SERVICE } from "../constants";
import { DataResult } from "src/Common/data/DataResult";

@ApiTags('User')
@Controller('/api/users')
export class UserController {

  constructor(
    @Inject(USER_SERVICE)
    private userService: UserService,
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
  async get(@Req() request): Promise<DataResult<User>> {
    return this.userService.getListUser(
      request.query.hasOwnProperty('limit') ? parseInt(request.query.limit) : 10,
      request.query.hasOwnProperty('page') ? parseInt(request.query.page) : 1
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Create User',
    description: 'The API for create User'
  })
  async create(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }
}
