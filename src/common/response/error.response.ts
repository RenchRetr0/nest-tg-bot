import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './abstract/base.response';

/**
 * Error response class.
 *
 * @description This class describes response of the failed operation. Nest filters
 * will catch controller return value and transform them to the current type.
 */
export class ErrorResponse extends BaseResponse {
    /**
     * Response path.
     */
    @ApiProperty()
    public readonly path!: string;

    /**
     * Response timestamp.
     */
    @ApiProperty()
    public readonly timestamp!: number;

    /**
     * Response error.
     *
     * @description Human-readable response error of unknown type.
     */
    @ApiProperty()
    public readonly error!: unknown;

    constructor(
        statusCode: number,
        path: string,
        timestamp: number,
        error: unknown,
    ) {
        super(statusCode);
        this.path = path;
        this.timestamp = timestamp;
        this.error = error;
    }
}
