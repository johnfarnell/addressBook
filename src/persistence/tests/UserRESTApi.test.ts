import { UserRESTApi, SERVER_URL } from '../UserRESTApi';
import { UserSerializableType } from '../interface';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');

describe('createUser', () => {
  let userRESTApis: UserRESTApi;
  beforeEach(() => {
    userRESTApis = new UserRESTApi();
    jest.clearAllMocks();
  });
  it('should create a User', async () => {
    const expectedName: string = 'Fred';
    const expectedUserId: number = 10;
    const userSerializableType: UserSerializableType = {
      id: expectedUserId,
      name: expectedName,
    };
    const axiosResponse: AxiosResponse<UserSerializableType> = {
      data: userSerializableType,
      status: 1,
      statusText: '',
      headers: {},
      config: {},
    };

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue(axiosResponse);
    const user = await userRESTApis.createUser(expectedName);
    expect(user.id).toEqual(userSerializableType.id);
    expect(mockedAxios.post).toHaveBeenCalledWith(SERVER_URL, {
      name: expectedName,
    });
  });
  it('should get a list of Users', async () => {
    const userSerializableTypes: UserSerializableType[] = [
      {
        id: 10,
        name: 'Bill',
      },
      {
        id: 20,
        name: 'Tom',
      },
    ];
    const axiosResponse: AxiosResponse<UserSerializableType[]> = {
      data: userSerializableTypes,
      status: 1,
      statusText: '',
      headers: {},
      config: {},
    };

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue(axiosResponse);
    const users = await userRESTApis.getUsers();
    expect(users.length).toEqual(2);
    expect(users[0].id).toEqual(10);
    expect(mockedAxios.get).toHaveBeenCalledWith(SERVER_URL);
  });
});
