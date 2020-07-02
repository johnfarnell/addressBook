import { AddressBookImports } from '../../services/interfaces';
import { User } from '../../model/User';
import { AddressBook } from '../../model/AddressBook';
import { UserSerializable } from '../../persistence/interface';

export const importIntoAddressBookHelper = async (
  addressBookImported: AddressBookImports,
  users: User[],
  addressBook: AddressBook,
  userSerializable: UserSerializable
): Promise<AddressBook> => {
  for (const addressBookUserName of addressBookImported) {
    const matchingUser = users.find(
      (user) => user.name === addressBookUserName.name
    );

    if (matchingUser) {
      const userId = matchingUser.id;
      if (userId) {
        addressBook.addUser(
          userId,
          addressBookUserName.name,
          addressBookUserName.phoneNumber
        );
      }
    } else {
      const user = await userSerializable.createUser(addressBookUserName.name);

      if (user && user.id) {
        addressBook.addUser(
          user.id,
          addressBookUserName.name,
          addressBookUserName.phoneNumber
        );
      }
    }
  }

  return addressBook;
};
