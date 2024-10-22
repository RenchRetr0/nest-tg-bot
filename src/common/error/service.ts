import { HttpStatusCode } from '@common/enums/http-status';

export abstract class ServiceError extends Error {
    /**
     * Internal numeric status code.
     */
    public readonly status!: number;

    /**
     * Creates new service error.
     *
     * @param message error human-readable message.
     * @param status internal numeric status code.
     */
    constructor(message: string, status?: number) {
        super(message);
        this.status = status ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
    }
}
