import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class SuppliersService {
   constructor(private prismaService: PrismaService) { }
  
    async create(createSupplierDto: CreateSupplierDto) {
      try {
        // Validar el correo electrónico
        const existingSupplier = await this.prismaService.supplier.findFirst({
          where: {
            name: createSupplierDto.name,
          }
        });
  
        if (existingSupplier) {
          throw new ConflictException('El proveedor con ese nombre ya está en uso');
        }
  
        return await this.prismaService.supplier.create({
          data: createSupplierDto
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async findAll() {
      try {
        return await this.prismaService.supplier.findMany({orderBy: {name: 'asc',}});
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async findOne(id: number) {
      try {
        return await this.prismaService.supplier.findUnique({
          where: {
            id,
          }
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async update(id: number, updateSupplierDto: UpdateSupplierDto) {
      const supplier = await this.findOne(id);
  
      try {
        if (!supplier) {
          throw new NotFoundException('Proveedor no encontrado');
        }
  
        // Validar el correo electrónico
        const existingSupplier = await this.prismaService.supplier.findFirst({
          where: {
            name: updateSupplierDto.name,
          }
        });
  
        if (existingSupplier && existingSupplier.id !== id) {
          throw new ConflictException('El nombre del proveedor ya está en uso');
        }
  
        return await this.prismaService.supplier.update({
          where: {
            id,
          },
          data: {
            ...updateSupplierDto,
          }
        })
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  
    async remove(id: number) {
      try {
        return await this.prismaService.supplier.delete({
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
