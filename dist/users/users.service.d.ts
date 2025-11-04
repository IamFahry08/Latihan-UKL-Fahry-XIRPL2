import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private users;
    create(dto: CreateUserDto): Promise<{
        createdAt: string;
        name: string;
        email: string;
        phone?: string;
        role?: string;
        id: number;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateData: Partial<CreateUserDto>): Promise<any>;
}
