import { User } from "@prisma/client";
import { prisma } from "../../../../shared/infra/Prisma/prismaClient";
import { IUserDto } from "../../dtos/userDto";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  async create(user: IUserDto): Promise<void> {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    })
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: id
        }
      }
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        }
      }
    })
    return user
  }

}

export { UsersRepository }