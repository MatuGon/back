import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MovementsService {
  constructor(private prismaService: PrismaService) { }

  async create(createMovementDto: CreateMovementDto) {
    try {

      // Validar si hay stock suficiente
      const product = await this.prismaService.product.findUnique({
        where: {
          id: createMovementDto.productId,
        }
      });

      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }

      if (product.stock < createMovementDto.amount) {
        throw new Error('No hay stock suficiente');
      }

      return await this.prismaService.movement.create({
        data: {
          ...createMovementDto,
          date: new Date(createMovementDto.date),
        }
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.movement.findMany();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

    async findOne(id: number) {
      try {
        return await this.prismaService.movement.findUnique({
          where: {
            id,
          }
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async update(id: number, updateMovementDto: UpdateMovementDto) {
      const movement = await this.findOne(id);
  
      try {
        if (!movement) {
          throw new NotFoundException('Movimiento no encontrado');
        }
  
        return await this.prismaService.movement.update({
          where: {
            id,
          },
          data: {
            ...updateMovementDto,
          }
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async remove(id: number) {
      try {
        return await this.prismaService.movement.delete({
          where: {
            id,
          }
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

}