import { User } from '../User';

describe('User', () => {
  it('should hold the id and name of the User', () => {
    const id = 1;
    const name = 'Jim';
    const user = new User(name, id);
    expect(user.id).toEqual(id);
    expect(user.name).toEqual(name);
  });
  it('should hold the name of the User', () => {
    const name = 'Jim';
    const user = new User(name);
    expect(user.id).toBeUndefined();
    expect(user.name).toEqual(name);
  });
});
