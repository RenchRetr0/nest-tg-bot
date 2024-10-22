import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import * as cors from 'cors';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ credentials: true, origin: true });

	const config = app.get(ConfigService);
	const port = config.get<number>('APP_PORT');
	const baseUrl = config.get<string>('APP_DOMAIN');
	const serverUrl = config.get<string>('SERVER_URL');

	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
	app.use(
		cors({
			origin: [
				'http://localhost:5000',
				'https://shop-flax-delta.vercel.app',
			],
		}),
	);

	// const configDocument = new DocumentBuilder()
	//     .setTitle('SMM Doc')
	//     .setDescription('Swagger Super-SMM')
	//     .setVersion('1.0')
	//     .addBearerAuth()
	//     .addServer(baseUrl)
	//     .addServer(serverUrl)
	//     .build();
	// const document = SwaggerModule.createDocument(app, configDocument);
	// SwaggerModule.setup('swagger', app, document, {
	//     swaggerOptions: { persistAuthorization: true },
	// });

	// app.useGlobalPipes(
	//     new ValidationPipe({
	//         transform: true,
	//         whitelist: true,
	//         disableErrorMessages: false,
	//     }),
	// );
	// app.useGlobalGuards(
	//     new JwtAuthGuard(app.get(JwtService), app.get(Reflector)),
	// );

	await app.listen(port || 3000);
}
bootstrap();
