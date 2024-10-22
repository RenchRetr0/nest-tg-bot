import {
	Injectable,
	NestMiddleware,
	BadRequestException,
} from '@nestjs/common';

@Injectable()
export class AtLeastOneFieldFilledMiddleware<T> implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		const updateTDto: T = req.body;

		if (!Object.keys(updateTDto).length) {
			throw new BadRequestException(
				'At least one field must be filled in to update.',
			);
		}

		next();
	}
}
