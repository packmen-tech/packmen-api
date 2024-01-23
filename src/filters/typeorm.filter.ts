import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const code: number = (exception as any).code;
    const detail: string = (exception as any).detail ?? '';

    const badRequestError = new BadRequestException(exception.message, {
      cause: exception,
      description: `[${code}] ${detail}`
    });

    console.error(exception);

    response
      .status(badRequestError.getStatus())
      .json(badRequestError.getResponse());
  }
}
