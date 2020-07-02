import { setUpAddressBook } from '../setUpAddressBook';
import { AddressBook } from '../../../model/AddressBook';
import {
  UserSerializable,
  AddressBookSerializable,
} from '../../../persistence/interface';
import { mocked } from 'ts-jest/utils';
class MockAddressBookSerializable implements AddressBookSerializable {
  constructor(
    private mockFunctionGetAddressBook: () => Promise<AddressBook>,
    private mockFunctionCreateAddressBook: () => Promise<AddressBook>
  ) {}
  async createAddressBook(): Promise<AddressBook> {
    return await this.mockFunctionCreateAddressBook();
  }
  async getAddressBook(): Promise<AddressBook> {
    return await this.mockFunctionGetAddressBook();
  }
  saveAddressBook(addressBook: AddressBook): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
describe('importIntoAddressBookHelper', () => {
  it('should use the existing AddressBook to addUser', async () => {
    const addressBookGet: AddressBook = new AddressBook(1);
    const addressBookCreate: AddressBook = new AddressBook(2);
    const mockFunctionGetAddressBook = jest
      .fn()
      .mockResolvedValue(addressBookGet);
    const mockFunctionCreateAddressBook = jest
      .fn()
      .mockResolvedValue(addressBookCreate);
    const mockAddressBookSerializable: MockAddressBookSerializable = new MockAddressBookSerializable(
      mockFunctionGetAddressBook,
      mockFunctionCreateAddressBook
    );

    const actualAddressBook = await setUpAddressBook(
      mockAddressBookSerializable
    );

    expect(actualAddressBook.getId()).toEqual(addressBookGet.getId());
    expect(mockFunctionGetAddressBook).toHaveBeenCalled();
    expect(mockFunctionCreateAddressBook).not.toHaveBeenCalled();
  });

  it('should create an AddressBook to addUser', async () => {
    const addressBookGet: AddressBook = new AddressBook(undefined);
    const addressBookCreate: AddressBook = new AddressBook(2);
    const mockFunctionGetAddressBook = jest
      .fn()
      .mockResolvedValue(addressBookGet);
    const mockFunctionCreateAddressBook = jest
      .fn()
      .mockResolvedValue(addressBookCreate);
    const mockAddressBookSerializable: MockAddressBookSerializable = new MockAddressBookSerializable(
      mockFunctionGetAddressBook,
      mockFunctionCreateAddressBook
    );

    const actualAddressBook = await setUpAddressBook(
      mockAddressBookSerializable
    );

    expect(actualAddressBook.getId()).toEqual(addressBookCreate.getId());
    expect(mockFunctionGetAddressBook).toHaveBeenCalled();
    expect(mockFunctionCreateAddressBook).toHaveBeenCalled();
  });
});
