import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../logger/logger.interface.js';
import { PinoLoggerService } from '../logger/pino.logger.js';
import { Config } from '../config/config.interface.js';
import { RestConfig } from '../config/rest.config.js';
import { RestSchema } from '../config/rest.schema.js';
import { RestApplication } from '../application/rest.application.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.Application).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLoggerService).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  return restApplicationContainer;
}
