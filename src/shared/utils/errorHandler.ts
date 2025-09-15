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

    const httpCode = (error as CustomError).httpCode || HttpStatus.BAD_REQUEST;
    const msg =
      (error as CustomError).message ||
      ((error as CustomError).httpCode && 'Undefined error') ||
      'Internal server error';
    return new HttpException(msg, httpCode);
  }

  static toCLIResponse(error: any): void {
    const logger = new Logger('CustomError');
    logger.error(error);
  }

  toText(): string {
    return `${Number(this.httpCode || HttpStatus.BAD_REQUEST)} - ${this.message || 'Undefined error'}`;
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
