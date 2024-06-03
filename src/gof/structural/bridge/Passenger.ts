import Account from "./Account";

export default class Passenger extends Account {
  constructor (name: string, email: string, document: string, readonly cardHolder: string, readonly cardNumber: string, readonly expireDate: string, readonly cvv: string, password: string, passwordType: string = "plaintext") {
    super(name, email, document, password, passwordType);
  }
}