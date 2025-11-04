import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint: Menambah pengguna baru
  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  // Endpoint tambahan: Melihat semua pengguna
  @Get()
  async findAll() {
    return this.usersService.findAll();
  } 

  @Get(':id')
  async findOne(@Param('id') id:string){
    return this.usersService.findOne(Number(id))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateUserDto>,
  ){
    return this.usersService.update(Number(id), updateData) 
  }
}
