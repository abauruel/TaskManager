import 'reflect-metadata'
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from 'bcrypt'
import { Secret, sign } from 'jsonwebtoken'

interface IAuthenticateUser {
  email: string,
  password: string
}

interface IAuthenticatedUser {
  token: string,
  user: {
    name: string
  }
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IAuthenticateUser): Promise<IAuthenticatedUser> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError("email or password incorrect")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("email or password incorrect")
    }

    const mySecret = process.env.SECRET
    if (!mySecret) {
      throw new Error()
    }

    const token = sign({}, mySecret, {
      subject: String(user.id),
      expiresIn: "1d"
    })

    return {
      token, user: {
        name: user.name
      }
    }

  }
}

export { AuthenticateUserUseCase }