import BankAccount from "../BankAccount";
import { BankAccountRepositoryMemory } from "../BankAccountRepository";
import GetBalance from "../GetBalance";
import MakeTransfer from "../MakeTransfer";

test("Deve fazer uma transferencia bancaria", async function (){
  const bankAccountRepository = new BankAccountRepositoryMemory();
  await bankAccountRepository.save(new BankAccount(1));
  await bankAccountRepository.save(new BankAccount(2));
  const makeTransfer = new MakeTransfer(bankAccountRepository);
  const input = {
    fromAccountId: 1,
    toAccountId: 2,
    amount: 100
  }
  await makeTransfer.execute(input);
  const getBalance = new GetBalance(bankAccountRepository);
  const outputA = await getBalance.execute(1);
  const outputB = await getBalance.execute(2);
  expect(outputA.balance).toBe(-100);
  expect(outputB.balance).toBe(100);
})