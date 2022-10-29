import { Injectable } from '@nestjs/common';
import { SentryModuleOptions } from '@ntegral/nestjs-sentry';

import { EnvConfigService } from './env-config.service';

@Injectable()
export class SentryConfigService {
  private readonly dsn: string;
  private readonly env: string;
  private configService: EnvConfigService = new EnvConfigService();

  constructor() {
    this.dsn = this.configService.get('SENTRY_DNS');
    this.env = this.configService.get('SENTRY_ENV');
  }

  createSentryModuleOptions(): SentryModuleOptions {
    return {
      dsn: this.dsn,
      environment: this.env,
      tracesSampleRate: 1.0,
    };
  }
}
