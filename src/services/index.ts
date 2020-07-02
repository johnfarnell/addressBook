import { CSVAddressBookImport } from './CSVAddressBookImport';
import { AddressBookImportable } from './interfaces';
import path from 'path';
const fileName = process.argv[2] || 'address-book.csv';
export const addressBookImport: AddressBookImportable = new CSVAddressBookImport(
  path.join(__dirname, '..', '..', 'csv', fileName)
);
export const findRelativeComplements = (
  list1: string[],
  list2: string[]
): string[] => {
  let index1 = 0;
  let index2 = 0;
  let relativeComplement: string[] = [];
  const listSorted1 = list1.sort();
  const listSorted2 = list2.sort();
  while (index1 < listSorted1.length || index2 < listSorted2.length) {
    /*
      if index1 has reached the end, then all the remaining names in index2 are unique
    */

    if (index1 >= listSorted1.length) {
      relativeComplement = [
        ...relativeComplement,
        ...listSorted2.slice(index2),
      ];
      break;
    }
    /*
      As above, but this time remaining names in index1 are unique
    */
    if (index2 >= listSorted2.length) {
      relativeComplement = [
        ...relativeComplement,
        ...listSorted1.slice(index1),
      ];
      break;
    }

    // Otherwise, check if their is a "lesser" value name and if there is add it to the uniqueNames

    if (listSorted1[index1] < listSorted2[index2]) {
      relativeComplement = [...relativeComplement, listSorted1[index1]];
      index1++;
      continue;
    } else if (listSorted1[index1] > listSorted2[index2]) {
      relativeComplement = [...relativeComplement, listSorted2[index2]];
      index2++;
      continue;
    }
    //If we reach here, the names for index1 and index2 must match so can not be unique, skip both
    index1++;
    index2++;
  }
  return relativeComplement;
};
