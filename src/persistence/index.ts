import { UserRESTApi } from './UserRESTApi';
import { UserSerializable, AddressBookSerializable } from './interface';
import { AddressBookRESTApi } from './AddressBookRESTApi';
export const userSerializable: UserSerializable = new UserRESTApi();
export const addressBookSerializable: AddressBookSerializable = new AddressBookRESTApi();
