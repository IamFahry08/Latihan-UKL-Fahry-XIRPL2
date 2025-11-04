import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(@Body() body: { userId: number; status: string }) {
    return this.attendanceService.createAttendance(body);
  }

  @Get()
  async findAll() {
    return this.attendanceService.findAll();
  }

  @Get('history/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.attendanceService.findByUser(Number(userId));
  }

  // ENDPOINT BARU: Summary kehadiran bulanan
  @Get('summary/:userId')
  getSummary(@Param('userId') userId: string, @Query('month') month?: string) {
    return this.attendanceService.getSummary(Number(userId), month);
  }

  // Analisis kehadiran
  @Post('analysis')
  async getAnalysis(@Body() body: any) {
    return this.attendanceService.getAnalysis(body);
  }
}
