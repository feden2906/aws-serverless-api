import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';

@ApiTags('habits')
@Controller('habits')
@ApiBearerAuth()
// @UseGuards(UserAuthGuard)
export class HabitController {
  constructor(@InjectSentry() private readonly client: SentryService) {}

  @ApiOperation({ summary: "get user's habits" })
  @Get()
  public async getHabits(): Promise<any> {
    try {
      this.client.log('test-log', 'LOG');
      this.client.error('test-error', '', 'ERR');
      this.client.verbose('INFO-verbose', 'OK');

      return {
        aaa: 'bbkkb',
        qqq: '22222222',
      };
    } catch (error) {}
  }

  @ApiOperation({ summary: 'create new habit' })
  @Post()
  public async createHabit(): Promise<any> {
    try {
    } catch (error) {}
  }

  @ApiOperation({ summary: 'edit habit by ID' })
  @HttpCode(HttpStatus.CREATED)
  @Put(':habitId')
  public async editHabit(): Promise<any> {
    try {
    } catch (error) {}
  }

  @ApiNoContentResponse({ description: 'habit was deleted' })
  @ApiOperation({ summary: 'delete one habit by ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':habitId')
  public async deleteHabit(): Promise<void> {
    try {
    } catch (error) {}
  }

  @ApiNoContentResponse({ description: 'qqqqqq' })
  @ApiOperation({ summary: 'delete one habit by ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/sadasdasdsahabitId')
  public async deleteHabitdd(): Promise<void> {
    try {
    } catch (error) {}
  }
}
