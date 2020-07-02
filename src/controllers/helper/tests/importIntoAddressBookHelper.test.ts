import { importIntoAddressBookHelper } from '../importIntoAddressBookHelper';
import { AddressBookImports } from '../../../services/interfaces';
import { User } from '../../../model/User';
import { AddressBook } from '../../../model/AddressBook';
import { UserSerializable } from '../../../persistence/interface';
import { mocked } from 'ts-jest/utils';

jest.mock('../../../model/AddressBook');
const addUser = jest.fn();
jest.mock('../../../model/AddressBook', () => {
  return {
    AddressBook: jest.fn().mockImplementation(() => {
      return {
        addUser,
      };
    }),
  };
});
class MockUserSerializable implements UserSerializable {
  constructor(
    private mockFunctionCreateUser: (name: string) => Promise<User>
  ) {}
  getUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  async createUser(name: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
describe('importIntoAddressBookHelper', () => {
  const MockedAddressBook = mocked(AddressBook, true);

  beforeEach(() => {
    // Clears the record of calls to the mock constructor function and its methods
    MockedAddressBook.mockClear();
  });

  it('should find "Bill" and add him to the Address Book', async () => {
    const addressBookImported: AddressBookImports = [
      { name: 'Bill', phoneNumber: '612368732' },
    ];
    const users: User[] = [{ name: 'Bill', id: 10 }];

    const newUser: User = { id: 1, name: 'Bill' };
    const mockFunctionCreateUser = jest.fn().mockResolvedValue(newUser);
    const userSerializable: UserSerializable = new MockUserSerializable(
      mockFunctionCreateUser
    );
    const addressBook: AddressBook = new AddressBook();

    await importIntoAddressBookHelper(
      addressBookImported,
      users,
      addressBook,
      userSerializable
    );

    expect(addUser).toHaveBeenCalledWith(10, 'Bill', '612368732');
  });
});
