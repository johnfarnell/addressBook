export class User {
  id?: number;
  name: string;
  constructor(name: string, id?: number | undefined) {
    this.id = id;
    this.name = name;
  }
}
