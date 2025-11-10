export interface FileReader extends NodeJS.EventEmitter {
  read(filename: string): void;
}
