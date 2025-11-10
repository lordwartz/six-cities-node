import 'reflect-metadata';
import { RestApplication } from './core/application/rest.application.js';
import { Component } from './types/component.enum.js';
import { createRestApplicationContainer } from './core/container/rest.container.js';

async function bootstrap() {
  const container = createRestApplicationContainer();
  const application = container.get<RestApplication>(Component.Application);
  await application.init();
}

bootstrap();
