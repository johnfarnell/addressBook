import { User } from './User';

export class AddressBookUserItem {
  userId: number;
  name: string;
  phoneNumber: string;
  constructor(userId: number, name: string, phoneNumber: string) {
    this.userId = userId;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }
}

export class AddressBook {
  id?: number;
  users: AddressBookUserItem[] = [];
  constructor(id?: number | undefined) {
    this.id = id;
  }

  getId = (): number | undefined => {
    return this.id;
  };
  getUserNames = (): string[] => {
    return this.users.map((item: AddressBookUserItem) => item.name);
  };
  getUsers = (): AddressBookUserItem[] => {
    return this.users;
  };

  addUser = (userId: number, name: string, phoneNumber: string): void => {
    const userItem = this.users.find((u) => u.name === name);
    if (!userItem) {
      this.users.push(new AddressBookUserItem(userId, name, phoneNumber));
      this.users = this.users.sort(
        (
          { name: name1 }: AddressBookUserItem,
          { name: name2 }: AddressBookUserItem
        ): number => (name1 < name2 ? -1 : name1 > name2 ? 1 : 0)
      );
    }
  };
}
