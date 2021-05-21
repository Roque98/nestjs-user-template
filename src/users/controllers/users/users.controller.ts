import { Body, Controller, Delete, Get, Param,  Put, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminTokenGuard } from 'src/common/guards/admin-token.guard';
import { UserTokenGuard } from 'src/common/guards/user-token.guard';
import { MongoIdPipe } from 'src/common/pipe/mongo-id.pipe';
import { UpdateUserAdminDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('admin')
  @UseGuards(AdminTokenGuard)
  findAll() {    
    return this.usersService.findAll();
  }

  @Get('admin/:id')
  @UseGuards(AdminTokenGuard)
  getAdmin(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Put('admin/:id')
  @UseGuards(AdminTokenGuard)
  updateAdmin(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserAdminDto) {
    return this.usersService.update(id, payload);
  }

  @Delete('admin/:id')
  @UseGuards(AdminTokenGuard)
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }

  // Users
  @Get('')
  @UseGuards(UserTokenGuard)
  get(
    @Req() request: any
  ) {
    const idUser = request.user.id;
    return this.usersService.findOne(idUser);
  }

  @Put()
  @UseGuards(UserTokenGuard) 
  update( 
    @Body() payload: UpdateUserDto,
    @Req() request: any
  ) {
    const idUser = request.user.id;
    return this.usersService.update(idUser, payload);
  }

  
}
