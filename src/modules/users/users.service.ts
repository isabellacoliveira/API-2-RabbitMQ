import { PrismaService } from './../../../database/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
// poderá receber um construtor do prisma
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private users: User[] = [];
  async create(createUserDto: CreateUserDto) {
    const findUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const user = new User();
    // ao inves de fazer user.name = createUserDto.name, vamos usar
    // constante, e dados que eu quero passar
    Object.assign(user, {
      ...createUserDto,
    });
    await this.prisma.user.create({
      // tudo o que tem dentro de users
      data: { ...user },
    });
    return plainToInstance(User, user);
  }

  async findAll() {
    // find many para trazer todos os usuários
    const users = await this.prisma.user.findMany();
    return plainToInstance(User, users);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(User, user);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // return plainToInstance(User, user); retirar se não nossa senha será removida
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
    return plainToInstance(User, updateUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({ where: { id } });
  }
}
