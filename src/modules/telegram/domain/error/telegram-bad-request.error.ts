import { HttpException } from '@nestjs/common';
import { HttpStatusCode, HttpStatusMessage } from '@common/enums';

export class TelegramBarRequest extends HttpException {
	constructor() {
		super(
			{ message: HttpStatusMessage[HttpStatusCode.BAD_REQUEST] },
			HttpStatusCode.BAD_REQUEST,
		);
	}
}
