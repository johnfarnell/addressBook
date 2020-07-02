import { CSVAddressBookImport } from '../CSVAddressBookImport';
import path from 'path';

describe('CSVAddressBookImport', () => {
  it('CSVAddressBookImport', async () => {
    const fileName = path.join(__dirname, 'address-book.csv');
    const csvAddressBookImport: CSVAddressBookImport = new CSVAddressBookImport(
      fileName
    );
    const addressBooks = await csvAddressBookImport.getImportedAddressBook();

    expect(addressBooks.length).toEqual(5);
    expect(addressBooks[0].name).toEqual('John');
    expect(addressBooks[0].phoneNumber).toEqual('0477778888');
  });
});
