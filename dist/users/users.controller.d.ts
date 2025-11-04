import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: CreateUserDto): Promise<{
        createdAt: string;
        name: string;
        email: string;
        phone?: string;
        role?: string;
        id: number;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateData: Partial<CreateUserDto>): Promise<any>;
}
