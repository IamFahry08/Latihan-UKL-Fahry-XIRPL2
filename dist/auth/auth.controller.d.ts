import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        status: string;
        massage: string;
        token: string;
    } | {
        status: string;
        massage: string;
        token?: undefined;
    }>;
}
