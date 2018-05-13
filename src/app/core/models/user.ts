export class User {
  constructor(public name: string,
              public userName: string,
              public token: string,
              public type: string,
              public locationId: string,
              public officeId: string,
              public email: string,
              public isAdmin: boolean) {}
}