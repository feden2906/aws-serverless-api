import { Module } from '@nestjs/common';

import { HabitController } from './habit.controller';

@Module({
  controllers: [HabitController],
  exports: [],
  imports: [],
  providers: [],
})
export class HabitModule {}
