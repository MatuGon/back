import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MovementsService {
  constructor(private prismaService: PrismaService) { }

  async create(createMovementDto: CreateMovementDto) {
    try {
      // Validar movimiento
      const existingMovement = await this.prismaService.movement.findFirst({
        where: {
          name: createMovementDto.name,
        }
      });

      if (existingMovement) {
        throw new ConflictException('El movimiento con ese nombre ya está en uso');
      }

      return await this.prismaService.movement.create({
        data: createMovementDto
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.movement.findMany({ orderBy: { name: 'asc', } });
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

      // Validar movimiento
      const existingMovement = await this.prismaService.movement.findFirst({
        where: {
          name: updateMovementDto.name,
        }
      });

      if (existingMovement && existingMovement.id !== id) {
        throw new ConflictException('El nombre del movimiento ya está en uso');
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
