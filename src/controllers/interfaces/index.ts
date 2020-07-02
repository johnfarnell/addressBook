import {
  AddressBookImportable,
  AddressBookImports,
} from '../../services/interfaces';
import {
  UserSerializable,
  AddressBookSerializable,
} from '../../persistence/interface';
import { AddressBook } from '../../model/AddressBook';
import { User } from '../../model/User';
export type ExecutableResult = {
  relativeComplements: string[];
  addressBook: AddressBook;
};
export interface Executable {
  execute(
    addressBookImport: AddressBookImportable,
    userSerializable: UserSerializable,
    addressBookSerializable: AddressBookSerializable,
    findRelativeComplements: (list1: string[], list2: string[]) => string[],
    importIntoAddressBookHelper: (
      addressBookImported: AddressBookImports,
      users: User[],
      addressBook: AddressBook,
      userSerializable: UserSerializable
    ) => Promise<AddressBook>,
    setUpAddressBook: (
      addressBookSerializable: AddressBookSerializable
    ) => Promise<AddressBook>
  ): Promise<ExecutableResult>;
}
