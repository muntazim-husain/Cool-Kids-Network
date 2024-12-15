import { Controller, Post, Body, Patch, Query, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body('email') email: string) {
    return this.usersService.create(email);
  }

  @Get('list')
  async fetchAll(@Query('role') role: string) {
    return this.usersService.fetchAllUsers(role);
  }

  @Patch('update-role')
  async updateRole(@Body() body: { email: string; role: string }) {
    return this.usersService.updateRole(body.email, body.role);
  } 
}
