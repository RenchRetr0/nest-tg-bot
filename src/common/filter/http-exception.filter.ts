import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
	public catch(exception: HttpException, host: ArgumentsHost) {
		const context: HttpArgumentsHost = host.switchToHttp();
		const response: Response = context.getResponse<Response>();
		const request: Request = context.getRequest<Request>();
		const status = exception.getStatus();
		const message = exception.getResponse();

		response.status(status).json({
			statusCode: status,
			message: message,
			path: request.path,
		});
	}
}
