import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// aktifkan plugin dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class UsersService {
  private users: any[] = [];

  async create(dto: CreateUserDto) {
    const localTime = dayjs().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    const newUser = {
      id: this.users.length + 1,
      ...dto,
      createdAt: localTime,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: number) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      return { message: `User dengan id ${id} tidak ditemukan` };
    }

    return user;
  }

  // method update di bawah ini
  async update(id: number, updateData: Partial<CreateUserDto>) {
    const localTime = dayjs().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    // Cari user berdasarkan ID
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return { message: `User dengan id ${id} tidak ditemukan ` };
    }

    // Update data user-nya
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
      updatedAt: localTime,
    };

    return this.users[userIndex];
  }
}
