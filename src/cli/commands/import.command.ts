import { Command } from '../command.interface.js';

import chalk from 'chalk';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';

export class ImportCommand implements Command {
  private fileReader: TSVFileReader;
  private processedCount = 0;

  constructor() {
    this.fileReader = new TSVFileReader();
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error occurred';
  }

  private onImportedLine = async (line: string, resolve: () => void): Promise<void> => {
    const offer = line.trim();

    if (offer && !offer.startsWith('title\t')) {
      this.processedCount++;

      if (this.processedCount % 100 === 0) {
        console.info(chalk.blue(`Processed ${this.processedCount} rows...`));
      }
    }

    resolve();
  };

  private onCompleteImport = (): void => {
    console.info(chalk.green('Import completed!'));
    console.info(chalk.green(`Total objects processed: ${this.processedCount}`));

    this.processedCount = 0;
  };

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string): Promise<void> {
    if (!filename) {
      console.error(chalk.red('Please provide filename for import'));
      return;
    }

    this.fileReader.on('line', this.onImportedLine);
    this.fileReader.on('end', this.onCompleteImport);

    try {
      console.info(chalk.blue(`Starting import from ${filename}...`));
      await this.fileReader.read(filename);
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to import data from file: ${filename}`));
      console.error(chalk.red(this.getErrorMessage(error)));
    }
  }
}
