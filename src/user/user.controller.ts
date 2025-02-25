import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchParamsDTO, User } from 'libs/schema/src';
import { UserService } from './user.service';
import { ICreateUserDTO, IUserResponse, IUserUpdateRequest } from './dto/user';

@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('create')
  @HttpCode(201)
  async createUser(@Body() createUserDTO: ICreateUserDTO): Promise<void> {
    return this.userService.createUser(createUserDTO);
  }

  @Get('')
  @HttpCode(200)
  get(@Query() params: SearchParamsDTO): Promise<IUserResponse> {
    return this.userService.get(params);
  }

  @Get('list')
  @HttpCode(200)
  list(@Query() params: SearchParamsDTO): Promise<User[]> {
    return this.userService.list(params);
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() body: IUserUpdateRequest,
  ): Promise<void> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}


// @Put(':id/toggle-block/:status')
// @HttpCode(200)
// toggleBlock(
//   @Param('id') id: string,
//   @Param('status') status: boolean,
// ): Promise<void> {
//   return this.userService.toggleBlock(id, status);
// }


// @Get('users')
// @HttpCode(200)
// @UseGuards(RoleGuard([UserRoles.Administrator]))
// async getUsers(): Promise<User[]> {
//   return this.userService.getAllUsers();
// }
