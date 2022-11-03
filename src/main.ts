import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/serverless';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import express from 'express';

import { AppModule } from './app.module';

let server: Handler;

Sentry.AWSLambda.init({
  dsn: process.env.SENTRY_DNS,
  enabled: process.env.NODE_ENV !== 'local',
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

async function bootstrap(): Promise<Handler> {
  const expressApp = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: '*',
  });

  const options = new DocumentBuilder()
    .setTitle('Api documentation')
    .addBearerAuth({
      bearerFormat: 'JWT',
      in: 'header',
      scheme: 'bearer',
      type: 'http',
    })
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.init();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = Sentry.AWSLambda.wrapHandler(
  async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
  },
  { captureAllSettledReasons: true, flushTimeout: 10 },
);
