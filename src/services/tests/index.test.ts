import { findRelativeComplements } from '../index';

describe('findRelativeComplements', () => {
  it('findRelativeComplements sucessfully returns union of relative complements with the tail in list 1', () => {
    const list1 = ['Ben', 'Bill', 'Vince', 'Walter', 'Frank', 'Tom', 'Terry'];
    const list2 = ['Alan', 'Ben', 'Frank', 'Harry', 'Tom', 'Terry'];
    const id = 1;
    const userId = 4;
    const result = findRelativeComplements(list1, list2);
    expect(result).toEqual(['Alan', 'Bill', 'Harry', 'Vince', 'Walter']);
  });
  it('findRelativeComplements sucessfully returns union of relative complements with the tail in list 2', () => {
    const list1 = ['Alan', 'Ben', 'Frank', 'Harry', 'Tom', 'Terry'];
    const list2 = [
      'Ben',
      'Bill',
      'Frank',
      'Harry',
      'Tom',
      'Terry',
      'Vince',
      'Walter',
    ];
    const id = 1;
    const userId = 4;
    const result = findRelativeComplements(list1, list2);
    expect(result).toEqual(['Alan', 'Bill', 'Vince', 'Walter']);
  });
});
