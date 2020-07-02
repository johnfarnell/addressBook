import { AddressBook } from '../model/AddressBook';
import { User } from '../model/User';
import { Executable, ExecutableResult } from './interfaces';
import {
  AddressBookImportable,
  AddressBookImports,
} from '../services/interfaces';
import {
  UserSerializable,
  AddressBookSerializable,
  AddressBookSerializableType,
} from '../persistence/interface';

export class Executor implements Executable {
  execute = async (
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
  ): Promise<ExecutableResult> => {
    // First step is to get the newly imported address book.
    const addressBookImported: AddressBookImports = await addressBookImport.getImportedAddressBook();
    // Now get the previously persisted users, it is possible there is none
    const users: User[] = await userSerializable.getUsers();
    // Now get the Address book fro the repository, this step will create one if it is not present in the persistent layer.
    const addressBook: AddressBook = await setUpAddressBook(
      addressBookSerializable
    );

    /*
      At this stage we have retrieved an AddressBook and been supplied an external address book to be imported. The next step
      provides a list of users currently one of these address books but not the other, i.e. the union of the relative complement.
    */
    const relativeComplements = findRelativeComplements(
      addressBook.getUserNames(),
      addressBookImported.map(({ name }) => name)
    );

    const newAddressBook: AddressBook = await importIntoAddressBookHelper(
      addressBookImported,
      users,
      addressBook,
      userSerializable
    );
    await addressBookSerializable.saveAddressBook(newAddressBook);

    return { relativeComplements, addressBook: newAddressBook };
  };
}
