export class User {
  constructor(
    public _id: string,
    public username: string,
    public passwordHash: string,
    public salt: string
  ) {}
}
