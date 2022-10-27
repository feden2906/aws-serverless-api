import { Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Req, } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';

@ApiTags('habits')
@Controller('habits')
@ApiBearerAuth()
// @UseGuards(UserAuthGuard)
export class HabitController {
  @ApiOperation({ summary: 'get user\'s habits' })
  @Get()
  public async getHabits(@Req() req: any): Promise<any> {
    try {

    } catch (error) {

    }
  }

  @ApiOperation({ summary: 'create new habit' })
  @Post()
  public async createHabit(): Promise<any> {
    try {

    } catch (error) {
    }
  }

  @ApiOperation({ summary: 'edit habit by ID' })
  @HttpCode(HttpStatus.CREATED)
  @Put(':habitId')
  public async editHabit(): Promise<any> {
    try {
    } catch (error) {
    }
  }

  @ApiNoContentResponse({ description: 'habit was deleted' })
  @ApiOperation({ summary: 'delete one habit by ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':habitId')
  public async deleteHabit(): Promise<void> {
    try {
    } catch (error) {
    }
  }
}
