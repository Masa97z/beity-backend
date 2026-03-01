import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('المستخدمين (Users)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. مسار (me) يجب أن يكون دائماً في الأعلى
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'عرض بيانات المستخدم الحالي' })
  getProfile(@Req() req) {
    return req.user;
  }

  // (يمكنك لاحقاً إضافة مسار @Get(':id') هنا في الأسفل إذا احتجته)
}