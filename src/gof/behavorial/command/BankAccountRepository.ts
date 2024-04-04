import BankAccount from "./BankAccount";

export default interface BankAccountRepository {
  getById(bankAccountId: number): Promise<BankAccount>;
  save(bankAccount: BankAccount): Promise<void>;
  update(bankAccount: BankAccount): Promise<void>;
}

export class BankAccountRepositoryMemory implements BankAccountRepository {
  bankAccounts: BankAccount[];

  constructor() {
    this.bankAccounts = [];
  }

  async getById(bankAccountId: number): Promise<BankAccount> {
    const bankAccount = this.bankAccounts.find(bankAccount => bankAccount.id === bankAccountId);
    if(!bankAccount) throw new Error("Bank account not found");
    return bankAccount;
  }

  async save(bankAccount: BankAccount): Promise<void> {
    this.bankAccounts.push(bankAccount);
  }

  async update(bankAccount: BankAccount): Promise<void> {
    const index = this.bankAccounts.findIndex((existingBankAccount)=> existingBankAccount.id === bankAccount.id);
    this.bankAccounts.splice(index,1);
    this.bankAccounts.push(bankAccount);
  }

}