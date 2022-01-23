import { User } from "@prisma/client";
import { IUserDto } from "../dtos/userDto";
// import { IUserDto } from "../dtos/userDto";

interface IUsersRepository {
  create(user: IUserDto): Promise<void>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}

export { IUsersRepository }