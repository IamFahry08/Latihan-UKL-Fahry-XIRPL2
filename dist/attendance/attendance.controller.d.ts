import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(body: {
        userId: number;
        status: string;
    }): Promise<{
        status: string;
        massage: string;
        data: any[];
    }>;
    findAll(): Promise<{
        status: string;
        massage: string;
        data: any[];
    }>;
    findByUser(userId: string): Promise<{
        Status: string;
        massage: string;
        status?: undefined;
        message?: undefined;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: any[];
        Status?: undefined;
        massage?: undefined;
    }>;
    getSummary(userId: string, month?: string): {
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: {
            user_id: number;
            month: string;
            attendance_summary: {
                hadir: number;
                izin: number;
                sakit: number;
                alpa: number;
            };
        };
        message?: undefined;
    };
    getAnalysis(body: any): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: {
            periode: {
                start_date: string;
                end_date: string;
                total_hari: number;
            };
            total_users: number;
            detail: {
                user_id: any;
                total_hadir: number;
                total_izin: number;
                total_sakit: number;
                total_alpa: number;
                persentase_kehadiran: string;
            }[];
        };
        message?: undefined;
    }>;
}
