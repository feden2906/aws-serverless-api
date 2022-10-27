import { Module } from '@nestjs/common';
import { HabitModule } from "./modules/habit/habit.module";

// import { ConfigService } from './services/config.service';
// import { MongooseService } from './services/mongoose/mongoose.service';

@Module({
  imports: [
      HabitModule
  ]
})
export class AppModule { }
