import { Logger } from './logger.interface.js';
import pino, { Logger as PinoInstance } from 'pino';
import { injectable } from 'inversify';

@injectable()
export class PinoLoggerService implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    this.logger = pino({
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    });

    this.logger.info('Logger created...');
  }

  public info(message: string, ...args: unknown[]): void {
    if (args.length > 0) {
      this.logger.info({ args }, message);
    } else {
      this.logger.info(message);
    }
  }

  public warn(message: string, ...args: unknown[]): void {
    if (args.length > 0) {
      this.logger.warn({ args }, message);
    } else {
      this.logger.warn(message);
    }
  }

  public error(message: string, ...args: unknown[]): void {
    if (args.length > 0) {
      this.logger.error({ args }, message);
    } else {
      this.logger.error(message);
    }
  }

  public debug(message: string, ...args: unknown[]): void {
    if (args.length > 0) {
      this.logger.debug({ args }, message);
    } else {
      this.logger.debug(message);
    }
  }
}
