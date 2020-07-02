import { AddressBookImportable, AddressBookImports } from './interfaces';
import { AddressBook } from '../model/AddressBook';
import fs from 'fs';
import { EOL } from 'os';

export class CSVAddressBookImport implements AddressBookImportable {
  constructor(private fileName: string) {}
  getImportedAddressBook = async (): Promise<AddressBookImports> => {
    console.log({ fileName: this.fileName });
    return fs
      .readFileSync(this.fileName, { encoding: 'utf-8' })
      .split(EOL)
      .map((line: string) => {
        const parts: string[] = line.split(',');
        return {
          name: parts[0],
          phoneNumber: parts[1],
        };
      });
  };
}
