import { User } from "@prisma/client";
import { IUserDto } from "../../../dtos/userDto";
import { IUsersRepository } from "../../IUsersRepository";

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create(user: IUserDto): Promise<void> {
    const nextId = this.users.length + 1
    const newUser: User = {
      name: user.name, email: user.email, password: user.password,
      id: nextId
    }
    this.users.push(newUser)
  }
  async findById(id: number): Promise<User | null> {
    const user = this.users.find(u => u.id == id)
    if (!user) {
      return null
    }
    return user
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email == email)
    if (!user) {
      return null
    }
    return user
  }

}

export { UserRepositoryInMemory }