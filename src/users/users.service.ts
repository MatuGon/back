import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.prismaService.user.findUnique({ where: { email: createUserDto.email } });
      if (existingUser && existingUser.email === createUserDto.email) {
        throw new ConflictException('Email already exists');
      }
      return await this.prismaService.user.create({ data: createUserDto });
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }

  async findAll() {
    try {

      return await this.prismaService.user.findMany();
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }


  async findOne(id: number) {
    try {
      return await this.prismaService.user.findUnique({ where: { id } });
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    try {

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const existingUser = await this.prismaService.user.findUnique({ where: { email: updateUserDto.email } });
      
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email existente en otro usuario');
      }

      return await this.prismaService.user.update({
        where: { id },
        data: updateUserDto
      });
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({ where: { id, } });
  }
}