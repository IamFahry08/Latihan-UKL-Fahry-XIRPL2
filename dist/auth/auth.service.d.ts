import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        status: string;
        massage: string;
        token: string;
    } | {
        status: string;
        massage: string;
        token?: undefined;
    }>;
}
