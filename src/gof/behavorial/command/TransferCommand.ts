import BankAccount from "./BankAccount";

export default class TransferCommand {
  constructor(readonly from: BankAccount, readonly to: BankAccount, readonly amount: number){}

  execute(): void {
    this.from.debit(this.amount);
    this.to.credit(this.amount);
  }
}