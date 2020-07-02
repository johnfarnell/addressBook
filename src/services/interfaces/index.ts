import { AddressBook } from '../../model/AddressBook';

export type AddressBookImports = { name: string; phoneNumber: string }[];
export interface AddressBookImportable {
  getImportedAddressBook(): Promise<AddressBookImports>;
}
