import Login from "./Login";
import Signup from "./Signup";

test("deve criar uma conta de usuario", async function (){
  const signup = new Signup();
  const login = new Login();
  const inputSignup = { 
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: '123456'
  };
  await signup.execute(inputSignup); 
  const inputLogin = {
    email: 'john.doe@gmail.com',
    password: '123456'
  };
  const outputLogin = await login.execute(inputLogin);
  expect(outputLogin.success).toBe(true);
})