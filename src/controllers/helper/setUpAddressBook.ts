import { AddressBookSerializable } from '../../persistence/interface';
import { AddressBook } from '../../model/AddressBook';

export const setUpAddressBook = async (
  addressBookSerializable: AddressBookSerializable
): Promise<AddressBook> => {
  // Now get the previously persisted users, it is possible there is none
  // const users: User[] = await userSerializable.getUsers();
  // Now get the Address book fro the repository, this step will create one if it is not present in the persistent layer.
  let addressBook: AddressBook = await addressBookSerializable.getAddressBook();
  if (!addressBook.getId()) {
    addressBook = await addressBookSerializable.createAddressBook();
  }

  return addressBook;
};
