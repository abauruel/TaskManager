import 'dotenv/config'
import { AppError } from '../../../../shared/errors/appError'
import { UserRepositoryInMemory } from "../../repositories/implementations/in-memory/UserRepositoryInMemory"
import { RegisterUserUseCase } from '../Register/RegisterUserUseCase'
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

describe("Authenticate", () => {
  let userRepository: UserRepositoryInMemory
  let authenticateUserUseCase: AuthenticateUserUseCase
  let registerUserUseCase: RegisterUserUseCase

  beforeAll(() => {
    userRepository = new UserRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
    registerUserUseCase = new RegisterUserUseCase(userRepository)
    userRepository.users = []
  })

  it("should be able to authenticate user", async () => {
    const user = {
      name: 'teste 01',
      email: 'teste@teste.com',
      password: '123'
    }

    await registerUserUseCase.execute(user)
    const { email, password } = user
    const authenticated = await authenticateUserUseCase.execute({ email, password })

    expect(authenticated).toHaveProperty("token")

  })
  it("should not be  able to authenticate a invalid user", async () => {
    expect(async () => {
      const email = "teste1@teste.com"
      const password = "123"
      await authenticateUserUseCase.execute({ email, password })
    }).rejects.toBeInstanceOf(AppError)
  })
  it("should not be  able to authenticate a invalid password", async () => {
    const user = {
      name: 'teste 03',
      email: 'teste3@teste.com',
      password: '123'
    }

    await registerUserUseCase.execute(user)

    expect(async () => {

      const password = "1234"
      await authenticateUserUseCase.execute({ email: user.email, password })
    }).rejects.toBeInstanceOf(AppError)
  })
})