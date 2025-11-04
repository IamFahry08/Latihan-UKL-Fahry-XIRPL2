import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// aktifkan plugin dayjs
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class AttendanceService {
  private records: any[] = [];

  async createAttendance(data: { userId: number; status: string }) {
    // Ambil waktu sekarang dengan zona waktu jakarta
    const localTime = dayjs().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

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

  // melihat semua absensi tanpa apa-apa
  async findAll() {
    return {
      status: 'success',
      massage: 'Data semua presensi berhasil diambil',
      data: this.records,
    };
  }

  // melihat presensi berdasarkan user id
  async findByUser(userId: number) {
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

  // ENDPOINT BARU: Rekap kehadiran bulanan
  getSummary(userId: number, month?: string) {
    // Cari data user
    const userRecords = this.records.filter((r) => r.userId === userId);

    // Kalau gak ada data
    if (userRecords.length === 0) {
      return {
        status: 'error',
        message: `Belum ada data untuk user ${userId}`,
      };
    }

    // Tentuin bulan (kalau gak diisi, pakai bulan sekarang)
    const bulan = month || dayjs().tz('Asia/Jakarta').format('MM-YYYY');

    // Filter data sesuai bulan
    const dataPerBulan = userRecords.filter((r) => {
      return dayjs(r.date).format('MM-YYYY') === bulan;
    });

    // Hitung masing-masing status
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

  // ENDPOINT BARU: Analisis kehadiran
async getAnalysis(data: {
    start_date: string;
    end_date: string;
    group_by?: string;
  }) {
    const { start_date, end_date, group_by } = data;
  
    // 1. Filter data berdasarkan tanggal
    const filtered = this.records.filter((r) => {
      const tanggal = dayjs(r.date).format('YYYY-MM-DD');
      return tanggal >= start_date && tanggal <= end_date;
    });
  
    if (filtered.length === 0) {
      return {
        status: 'error',
        message: 'Tidak ada data di periode ini',
      };
    }
  
    // 2. Hitung total hari
    const totalHari = dayjs(end_date).diff(dayjs(start_date), 'day') + 1;
  
    // 3. Ambil semua userId yang unik
    const userIds = [...new Set(filtered.map((r) => r.userId))];
  
    // 4. Analisis per user
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
  
    // 5. Response
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
}