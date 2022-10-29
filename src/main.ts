import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import express from 'express';
import { ExpressAdapter } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common';

let server: Handler;

async function bootstrap(): Promise<Handler> {
    const expressApp = express();

    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            whitelist: true,
        }),
    );
    app.enableCors();


    const options = new DocumentBuilder()
        .setTitle('Api documentation')
        .addBearerAuth({ bearerFormat: 'JWT', in: 'header', scheme: 'bearer', type: 'http' })
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.init();
    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
};
