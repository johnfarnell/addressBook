import { Executor } from '../Executor';
import { userSerializable } from '../../persistence';
import {
  AddressBookImportable,
  AddressBookImports,
} from '../../services/interfaces';
import { AddressBook } from '../../model/AddressBook';
import { AddressBookSerializable } from '../../persistence/interface';
import { User } from '../../model/User';

jest.mock('../../persistence');
jest.mock('../../services/interfaces');

class MockAddressBookImportable implements AddressBookImportable {
  constructor(private mockFunction: () => Promise<AddressBookImports>) {}
  getImportedAddressBook(): Promise<AddressBookImports> {
    return this.mockFunction();
  }
}
class MockAddressBookSerializable implements AddressBookSerializable {
  constructor(
    private mockFunctionSave: (addressBook: AddressBook) => Promise<void>
  ) {}
  createAddressBook(): Promise<AddressBook> {
    throw new Error('Method not implemented.');
  }
  getAddressBook(): Promise<AddressBook> {
    throw new Error('Method not implemented.');
  }
  async saveAddressBook(addressBook: AddressBook): Promise<void> {
    return this.mockFunctionSave(addressBook);
  }
}

describe('Executor', () => {
  let executor: Executor;
  let addressBookImport: AddressBookImportable;
  let addressBookSerializable: AddressBookSerializable;
  beforeEach(() => {
    executor = new Executor();
  });
  it('should handle all the functionality of importing AddressBook and reporting details', async () => {
    // Mock the retrieval of the import AddressBook
    const addressGetImportedAddressBook: AddressBookImports = [
      { name: 'Bill', phoneNumber: '612368732' },
    ];
    const mockGetImportedAddressBookAddressBookImportable = jest
      .fn()
      .mockResolvedValue(addressGetImportedAddressBook);

    addressBookImport = new MockAddressBookImportable(
      mockGetImportedAddressBookAddressBookImportable
    );

    // Now mock the retrieval of the persisted data
    const mockUserSerializable = userSerializable as jest.Mocked<
      typeof userSerializable
    >;
    const users: User[] = [new User('Jim'), new User('Dave')];
    mockUserSerializable.getUsers.mockResolvedValue(users);

    // Now mock the retrieval of the existing AddressBook.

    const addressBook = new AddressBook(2);
    addressBook.addUser(16, 'Chester', '06464664');
    addressBook.addUser(17, 'Don', '0456785934');
    const setUpAddressBook = jest.fn().mockResolvedValue(addressBook);

    //Now mock the calculation of the relative complements

    const relativeComplements = ['Dennis'];
    const findRelativeComplements = jest
      .fn()
      .mockReturnValue(relativeComplements);

    // Now mock the importing of the the AddressBook

    const importIntoAddressBookHelper = jest
      .fn()
      .mockResolvedValue(addressBook);

    // Finally mock the saving of the AddressBook with the new imports

    const mockSaveAddressBookAddressBookSerializable = jest.fn();
    addressBookSerializable = new MockAddressBookSerializable(
      mockSaveAddressBookAddressBookSerializable
    );

    //Run the test ...
    await executor.execute(
      addressBookImport,
      mockUserSerializable,
      addressBookSerializable,
      findRelativeComplements,
      importIntoAddressBookHelper,
      setUpAddressBook
    );

    //Check behaviour as expected.
    expect(mockGetImportedAddressBookAddressBookImportable).toHaveBeenCalled();
    expect(mockUserSerializable.getUsers).toHaveBeenCalledWith();
    expect(findRelativeComplements).toHaveBeenCalledWith(
      ['Chester', 'Don'],
      ['Bill']
    );
    expect(importIntoAddressBookHelper).toHaveBeenCalledWith(
      addressGetImportedAddressBook,
      users,
      addressBook,
      userSerializable
    );
    expect(setUpAddressBook).toHaveBeenCalledWith(addressBookSerializable);
    expect(mockSaveAddressBookAddressBookSerializable).toHaveBeenCalledWith(
      addressBook
    );
  });
});
