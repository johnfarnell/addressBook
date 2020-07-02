import axios, { AxiosResponse } from 'axios';
import { JSON_SERVER_HOST } from './config';
import {
  AddressBookSerializable,
  AddressBookSerializableType,
  AddressBookItemSerializableType,
} from './interface';
import { AddressBook, AddressBookUserItem } from '../model/AddressBook';

export const SERVER_URL = `${JSON_SERVER_HOST}/addressbooks`;

export class AddressBookRESTApi implements AddressBookSerializable {
  createAddressBook = async (): Promise<AddressBook> => {
    const addressBookSerializableType: AxiosResponse<AddressBookSerializableType> = await axios.post<
      AddressBookSerializableType
    >(SERVER_URL, { users: [] });

    return new AddressBook(addressBookSerializableType.data.id);
  };

  getAddressBook = async (): Promise<AddressBook> => {
    const addressBookSerializableTypes: AxiosResponse<
      AddressBookSerializableType[]
    > = await axios.get<AddressBookSerializableType[]>(SERVER_URL);

    const addressBooks = addressBookSerializableTypes.data.map(
      (addressBookSerializableType: AddressBookSerializableType) => {
        const addressBook = new AddressBook(addressBookSerializableType.id);
        addressBookSerializableType.users.forEach((user) => {
          addressBook.addUser(user.userId, user.name, user.phoneNumber);
        });
        return addressBook;
      }
    );

    if (addressBooks.length > 0) {
      return addressBooks[0];
    }

    return new AddressBook();
  };

  saveAddressBook = async (addressBook: AddressBook): Promise<void> => {
    const users: AddressBookItemSerializableType[] = addressBook
      .getUsers()
      .map((user: AddressBookUserItem) => ({
        userId: user.userId,
        name: user.name,
        phoneNumber: user.phoneNumber,
      }));

    const id = addressBook.getId();
    if (id) {
      const addressBookSerializable: AddressBookSerializableType = {
        id,
        users,
      };

      await axios.put<AddressBookSerializableType>(
        `${SERVER_URL}/${addressBook.getId()}`,
        addressBookSerializable
      );
    }

    return;
  };
}
