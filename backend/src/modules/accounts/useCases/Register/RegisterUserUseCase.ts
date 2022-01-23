import 'reflect-metadata'
import { inject, injectable } from "tsyringe";
import { IUserDto } from "../../dtos/userDto";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from 'bcrypt'
import { User } from "@prisma/client";
import { AppError } from '../../../../shared/errors/appError';

@injectable()
class RegisterUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute(user: IUserDto): Promise<void> {
    const clientExist = await this.usersRepository.findByEmail(user.email)

    if (clientExist) {
      throw new AppError("user already exists")
    }

    const passwordHashed = await hash(user.password, 8)

    await this.usersRepository.create({
      name: user.name,
      password: passwordHashed,
      email: user.email
    })

  }
}

export { RegisterUserUseCase }