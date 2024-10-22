import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable, of } from 'rxjs';
import { GprAnswerModel } from '../model';

@Injectable()
export class ChatGPTUseCase {
	private readonly logger = new Logger(ChatGPTUseCase.name);
	private gptUrl: string;
	private apiKey: string;

	constructor(
		@Inject(ConfigService)
		private readonly configService: ConfigService,
		@Inject(HttpService)
		private readonly httpService: HttpService,
	) {
		this.gptUrl = 'https://openrouter.ai/api/v1/chat/completions';
		this.apiKey = this.configService.get<string>('KEY_OPENROUTER');
	}

	async generateResponse(message: string): Promise<Observable<string>> {
		const headers = {
			Authorization: `Bearer ${this.apiKey}`,
			'Content-Type': 'application/json',
		};
		const date = JSON.stringify({
			model: 'openai/chatgpt-4o-latest',
			messages: [
				{
					role: 'user',
					content: `Ты отвечаешь от имени телеграм бота по имени BlackMargo. Боту написали сообщение: ${message}`,
				},
			],
			provider: {
				order: ['OpenAI', 'Together'],
			},
		});
		return await this.httpService
			.post<GprAnswerModel>(this.gptUrl, date, { headers })
			.pipe(
				map(({ data }) => data.choices[0].message.content.trim()),
				catchError((error) => {
					this.logger.error(error);
					return of('Произошла ошибка');
				}),
			);
	}
}
