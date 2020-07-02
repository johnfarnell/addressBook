import axios, { AxiosResponse } from 'axios';
import { JSON_SERVER_HOST } from './config';
import { UserSerializable, UserSerializableType } from './interface';
import { User } from '../model/User';

export const SERVER_URL: string = `${JSON_SERVER_HOST}/users`;

export class UserRESTApi implements UserSerializable {
  createUser = async (name: string): Promise<User> => {
    const response: AxiosResponse<UserSerializableType> = await axios.post<
      UserSerializableType
    >(SERVER_URL, { name });

    return new User(response.data.name, response.data.id);
  };
  getUsers = async () => {
    const response: AxiosResponse<UserSerializableType[]> = await axios.get<
      UserSerializableType[]
    >(SERVER_URL);
    return response.data.map(
      (userSerializeableType: UserSerializableType) =>
        new User(userSerializeableType.name, userSerializeableType.id)
    );
  };
}
