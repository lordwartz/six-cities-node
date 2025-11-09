export class CommandParser {
  static parse(cliArguments: string[]): [string, string[]] {
    const parsedArguments = cliArguments.slice(2);
    const command = parsedArguments[0];

    if (!parsedArguments.length || !command) {
      return ['', []];
    }

    if (!command.startsWith('--')) {
      throw new Error(`Invalid command format: ${command}`);
    }

    const parameters = parsedArguments.slice(1);
    return [command, parameters];
  }
}
