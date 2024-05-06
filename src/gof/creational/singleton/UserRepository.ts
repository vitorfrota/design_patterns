import User from "./User";

export default interface UserRepository {
  getByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
}

export class UserRepositoryMemory implements UserRepository {
  private users: User[];
  static instance: UserRepositoryMemory;

  private constructor () {
    this.users = [];
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  static getInstance(){
    if(!UserRepositoryMemory.instance) {
      UserRepositoryMemory.instance = new UserRepositoryMemory();
    }
    return UserRepositoryMemory.instance;
  }
}