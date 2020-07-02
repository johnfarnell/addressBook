import { AddressBookRESTApi, SERVER_URL } from '../AddressBookRESTApi';
import { AddressBookSerializableType } from '../interface';
import axios, { AxiosResponse } from 'axios';
import { AddressBook } from '../../model/AddressBook';

jest.mock('axios');

describe('createAddressBook', () => {
  let addressBookRESTApis: AddressBookRESTApi;
  beforeEach(() => {
    addressBookRESTApis = new AddressBookRESTApi();
    jest.clearAllMocks();
  });
  it('should create an AddressBook entry', async () => {
    const addressBookSerializableType: AddressBookSerializableType = {
      id: 1234,
      users: [
        {
          userId: 7237123,
          name: 'John',
          phoneNumber: '0456789123',
        },
      ],
    };
    const axiosResponse: AxiosResponse<AddressBookSerializableType> = {
      data: addressBookSerializableType,
      status: 1,
      statusText: '',
      headers: {},
      config: {},
    };

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue(axiosResponse);
    const addressBook = await addressBookRESTApis.createAddressBook();
    expect(addressBook.getId()).toEqual(addressBookSerializableType.id);
    expect(mockedAxios.post).toHaveBeenCalledWith(SERVER_URL, { users: [] });
  });
  it('should GET an AddressBook entry', async () => {
    const expectAddressBookId = 1234;
    const addressBookSerializableTypes: AddressBookSerializableType[] = [
      {
        id: expectAddressBookId,
        users: [
          {
            userId: 7237123,
            name: 'John',
            phoneNumber: '0456789123',
          },
        ],
      },
    ];
    const axiosResponse: AxiosResponse<AddressBookSerializableType[]> = {
      data: addressBookSerializableTypes,
      status: 1,
      statusText: '',
      headers: {},
      config: {},
    };

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(axiosResponse);
    const addressBook = await addressBookRESTApis.getAddressBook();
    expect(addressBook.getId()).toEqual(expectAddressBookId);
    expect(mockedAxios.get).toHaveBeenCalledWith(SERVER_URL);
  });
  it('should GET an EMPTY AddressBook entry if there are none', async () => {
    const addressBookSerializableTypes: AddressBookSerializableType[] = [];
    const axiosResponse: AxiosResponse<AddressBookSerializableType[]> = {
      data: addressBookSerializableTypes,
      status: 1,
      statusText: '',
      headers: {},
      config: {},
    };

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(axiosResponse);
    const addressBook = await addressBookRESTApis.getAddressBook();
    expect(addressBook.getId()).toBeUndefined();
    expect(mockedAxios.get).toHaveBeenCalledWith(SERVER_URL);
  });
  it('should SAVE a AddressBook entry', async () => {
    const addressBookSerializableTypes: AddressBookSerializableType = {
      id: 10,
      users: [],
    };
    const axiosResponse: AxiosResponse<AddressBookSerializableType> = {
      data: addressBookSerializableTypes,
      status: 1,
      statusText: '',
      headers: {},
      config: {},
    };

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.put.mockResolvedValue(axiosResponse);
    const addressBook = new AddressBook(10);
    addressBook.addUser(20, 'Chester', '0456786986');
    addressBook.addUser(30, 'Jim', '04567444');
    const expectedAddressBookSerializable: AddressBookSerializableType = {
      id: 10,
      users: [
        { name: 'Chester', phoneNumber: '0456786986', userId: 20 },
        { name: 'Jim', phoneNumber: '04567444', userId: 30 },
      ],
    };
    await addressBookRESTApis.saveAddressBook(addressBook);
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${SERVER_URL}/10`,
      expectedAddressBookSerializable
    );
  });
  it('should NOT SAVE a AddressBook entry if there is no id', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const addressBook = new AddressBook();
    await addressBookRESTApis.saveAddressBook(addressBook);
    expect(mockedAxios.put).not.toHaveBeenCalled();
  });
});
