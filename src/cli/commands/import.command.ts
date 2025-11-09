import { Command } from '../command.interface.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import chalk from 'chalk';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private readFile(filename: string): string {
    try {
      const filePath = resolve(filename);
      return readFileSync(filePath, 'utf-8');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Cannot read file: ${filename}. Error: ${error.message}`);
      }
      throw new Error(`Cannot read file: ${filename}`);
    }
  }

  public execute(filename: string): void {
    if (!filename) {
      console.error(chalk.red('Please provide filename for import'));
      return;
    }

    try {
      const fileContent = this.readFile(filename);
      console.info(chalk.green('File content:'));
      console.info(chalk.blue(fileContent));
    } catch (error: unknown) {
      console.error(chalk.red('Failed to import data from file:'));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
