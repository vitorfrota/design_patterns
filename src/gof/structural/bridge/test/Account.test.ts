import Driver from "../Driver";
import Passenger from "../Passenger"

test('Deve criar uma conta do tipo passageiro', function () {
  const account = new Passenger('John Doe', 'johndoe@gmail.com', '111111111111', 'JOHN DOE', '1111 1111 1111 1111', '08/28', '123', '123456');
  expect(account.name).toBe('John Doe');
  expect(account.email).toBe('johndoe@gmail.com');
});

test('Deve criar uma conta do tipo motorista', function () {
  const account = new Driver('John Doe', 'johndoe@gmail.com', '111111111111', 'AAA9999', '123456');
  expect(account.name).toBe('John Doe');
  expect(account.email).toBe('johndoe@gmail.com');
});