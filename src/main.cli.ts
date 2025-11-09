#!/usr/bin/env node

import { CLIApplication } from './cli/cli.application.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.processCommand(process.argv);
}

bootstrap();
