import UserRepository, { UserRepositoryMemory } from "./UserRepository";

export default class Login { 
  userRepository: UserRepository
  
  constructor (){
    this.userRepository = UserRepositoryMemory.getInstance();
  }

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email);
    if(!user) throw new Error("User not found");
    if(!user.passwordMatches(input.password)) throw new Error("Authentication failed");
    return {
      success: true
    }
  }
}

type Input = {
  email: string;
  password: string;
}

type Output = {
  success: true
}