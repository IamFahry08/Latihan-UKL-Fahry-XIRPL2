"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
let AttendanceService = class AttendanceService {
    records = [];
    async createAttendance(data) {
        const localTime = (0, dayjs_1.default)().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
        const newRecord = {
            id: this.records.length + 1,
            userId: data.userId,
            status: data.status,
            date: localTime,
        };
        this.records.push(newRecord);
        return {
            status: 'Berhasil',
            massage: 'Presensi berhasil dicatat',
            data: this.records,
        };
    }
    async findAll() {
        return {
            status: 'success',
            massage: 'Data semua presensi berhasil diambil',
            data: this.records,
        };
    }
    async findByUser(userId) {
        const userRecords = this.records.filter((r) => r.userId === userId);
        if (userRecords.length === 0) {
            return {
                Status: 'eror',
                massage: `belum ada data presensi untuk userId ${userId}`,
            };
        }
        return {
            status: 'success',
            message: `Data presensi untuk userId ${userId} ditemukan`,
            data: userRecords,
        };
    }
    getSummary(userId, month) {
        const userRecords = this.records.filter((r) => r.userId === userId);
        if (userRecords.length === 0) {
            return {
                status: 'error',
                message: `Belum ada data untuk user ${userId}`,
            };
        }
        const bulan = month || (0, dayjs_1.default)().tz('Asia/Jakarta').format('MM-YYYY');
        const dataPerBulan = userRecords.filter((r) => {
            return (0, dayjs_1.default)(r.date).format('MM-YYYY') === bulan;
        });
        return {
            status: 'success',
            data: {
                user_id: userId,
                month: bulan,
                attendance_summary: {
                    hadir: dataPerBulan.filter((r) => r.status === 'hadir').length,
                    izin: dataPerBulan.filter((r) => r.status === 'izin').length,
                    sakit: dataPerBulan.filter((r) => r.status === 'sakit').length,
                    alpa: dataPerBulan.filter((r) => r.status === 'alpa').length,
                },
            },
        };
    }
    async getAnalysis(data) {
        const { start_date, end_date, group_by } = data;
        const filtered = this.records.filter((r) => {
            const tanggal = (0, dayjs_1.default)(r.date).format('YYYY-MM-DD');
            return tanggal >= start_date && tanggal <= end_date;
        });
        if (filtered.length === 0) {
            return {
                status: 'error',
                message: 'Tidak ada data di periode ini',
            };
        }
        const totalHari = (0, dayjs_1.default)(end_date).diff((0, dayjs_1.default)(start_date), 'day') + 1;
        const userIds = [...new Set(filtered.map((r) => r.userId))];
        const hasilPerUser = userIds.map((userId) => {
            const dataUser = filtered.filter((r) => r.userId === userId);
            const jumlahHadir = dataUser.filter((r) => r.status === 'hadir').length;
            const persentase = ((jumlahHadir / totalHari) * 100).toFixed(2);
            return {
                user_id: userId,
                total_hadir: jumlahHadir,
                total_izin: dataUser.filter((r) => r.status === 'izin').length,
                total_sakit: dataUser.filter((r) => r.status === 'sakit').length,
                total_alpa: dataUser.filter((r) => r.status === 'alpa').length,
                persentase_kehadiran: `${persentase}%`,
            };
        });
        return {
            status: 'success',
            data: {
                periode: {
                    start_date,
                    end_date,
                    total_hari: totalHari,
                },
                total_users: userIds.length,
                detail: hasilPerUser,
            },
        };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)()
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map