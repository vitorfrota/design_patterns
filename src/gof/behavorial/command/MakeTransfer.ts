import BankAccountRepository from "./BankAccountRepository";
import TransferCommand from "./TransferCommand";

export default class MakeTransfer {
  constructor(readonly bankAccountRepository: BankAccountRepository){}

  async execute(input: Input): Promise<void> {
    const from = await this.bankAccountRepository.getById(input.fromAccountId);
    const to = await this.bankAccountRepository.getById(input.toAccountId);
    const transferCommand = new TransferCommand(from, to, input.amount);
    transferCommand.execute();
    await this.bankAccountRepository.update(from);
    await this.bankAccountRepository.update(to);
  }
}

type Input = {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
}