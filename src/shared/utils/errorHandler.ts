import { HttpException, HttpStatus, Logger } from '@nestjs/common';

type CustomErrorParams = {
  name?: string;
  message: string;
  httpCode?: number;
};

export class CustomError extends Error {
  private readonly logger: Logger;
  httpCode?: number;
  message: string;

  constructor(params: CustomErrorParams) {
    super(params.message);
    this.name = params.name || 'CustomError';
    this.message = params.message;
    this.httpCode = params.httpCode;
    this.logger = new Logger(this.name);
  }

  static toHTTPResponse(error: any): HttpException {
    const logger = new Logger('CustomError');
    logger.error(error);

    if (error instanceof CustomError) {
      return error.toHTTP();
    }

    return new HttpException(
      (error as Error).message || 'Internal server error',
      HttpStatus.BAD_REQUEST,
    );
  }

  toText(): string {
    return `${Number(this.httpCode || HttpStatus.BAD_REQUEST)} - ${this.message || 'Undefined error'}`;
  }

  toHTTP(): HttpException {
    return new HttpException(
      this.message || 'Undefined error',
      Number(this.httpCode || HttpStatus.BAD_REQUEST),
    );
  }
}

export const CustomErrorTypes: Record<string, CustomErrorParams> = {
  TASK_NOT_FOUND: {
    name: 'TaskNotFound',
    message: 'Task not found',
    httpCode: HttpStatus.NOT_FOUND,
  },
  INVALID_ID: {
    name: 'InvalidId',
    message: 'Invalid ID',
    httpCode: HttpStatus.BAD_REQUEST,
  },
};
