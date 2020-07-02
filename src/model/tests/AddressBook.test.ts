import { AddressBook, AddressBookUserItem } from '../AddressBook';

describe('AddressBook', () => {
  it('should hold the id of the Address Book', () => {
    const id = 1;
    const addressBook = new AddressBook(id);
    expect(addressBook.id).toEqual(id);
  });
  it('should add a user when it is not ion the address book', () => {
    const id = 1;
    const addressBook = new AddressBook(id);
    addressBook.addUser(1, 'Fred', '041552552');
    const userItems: AddressBookUserItem[] = addressBook.getUsers();
    expect(userItems.length).toEqual(1);
    expect(userItems[0].name).toEqual('Fred');
  });
  it('should NOT add a user when it is not ion the address book', () => {
    const id = 1;
    const addressBook = new AddressBook(id);
    addressBook.addUser(1, 'Fred', '041552552');
    addressBook.addUser(2, 'Bill', '041552553');
    //Duplicate
    addressBook.addUser(1, 'Fred', '041552552');
    const userItems1: AddressBookUserItem[] = addressBook.getUsers();
    expect(userItems1[0].name).toEqual('Bill');
    const userItems2: AddressBookUserItem[] = addressBook.getUsers();
    expect(userItems2.length).toEqual(2);
  });
});
