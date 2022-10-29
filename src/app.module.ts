import { HttpException, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';

import { HabitModule } from './modules/habit/habit.module';
import { SentryConfigService } from './services';

@Module({
  imports: [
    HabitModule,
    SentryModule.forRootAsync({
      useClass: SentryConfigService,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () =>
        new SentryInterceptor({
          filters: [
            {
              filter: (exception: HttpException) => 500 > exception.getStatus(),
              type: HttpException, // Only report 500 errors
            },
          ],
        }),
    },
  ],
})
export class AppModule {}
