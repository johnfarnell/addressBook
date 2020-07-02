import { executable } from './controllers';
import { addressBookImport, findRelativeComplements } from './services';
import { userSerializable, addressBookSerializable } from './persistence';
import { setUpAddressBook } from './controllers/helper/setUpAddressBook';
import { importIntoAddressBookHelper } from './controllers/helper/importIntoAddressBookHelper';
import { ExecutableResult } from './controllers/interfaces';

executable
  .execute(
    addressBookImport,
    userSerializable,
    addressBookSerializable,
    findRelativeComplements,
    importIntoAddressBookHelper,
    setUpAddressBook
  )
  .then((result: ExecutableResult) => {
    console.log({
      relativeComplements: result.relativeComplements,
      sortedAddressBookNames: result.addressBook.getUserNames().sort(),
    });
  })
  .catch((rejected) => {
    console.log('ERROR');
    console.log({ rejected });
  });

//exec('json-server --watch db.json');
