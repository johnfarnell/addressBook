import { User } from '../../model/User';
import { AddressBook } from '../../model/AddressBook';

export type UserSerializableType = { id: number; name: string };
export type AddressBookItemSerializableType = {
  userId: number;
  name: string;
  phoneNumber: string;
};
export type AddressBookSerializableType = {
  id: number;
  users: AddressBookItemSerializableType[];
};

export interface UserSerializable {
  getUsers(): Promise<User[]>;
  createUser(name: string): Promise<User>;
}
export interface AddressBookSerializable {
  createAddressBook(): Promise<AddressBook>;
  getAddressBook(): Promise<AddressBook>;
  saveAddressBook(addressBook: AddressBook): Promise<void>;
}
