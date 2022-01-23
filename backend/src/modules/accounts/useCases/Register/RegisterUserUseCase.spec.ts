import { AppError } from "../../../../shared/errors/appError"
import { UserRepositoryInMemory } from "../../repositories/implementations/in-memory/UserRepositoryInMemory"
import { RegisterUserUseCase } from "./RegisterUserUseCase"

describe("User", () => {
  let userRepository: UserRepositoryInMemory
  let registerUseUseCase: RegisterUserUseCase

  beforeAll(() => {
    userRepository = new UserRepositoryInMemory()
    registerUseUseCase = new RegisterUserUseCase(userRepository)
  })

  it("should be able to create a new user", async () => {

    const user = {
      name: 'teste 01',
      email: 'teste@teste.com',
      password: '123'
    }

    await registerUseUseCase.execute(user)

    const userMatch = userRepository.users.find(u => u.name == user.name)

    expect(userMatch).toHaveProperty('name', user.name)
  })

  it("should not be able to create a new user", async () => {


    const user = {
      name: 'teste 01',
      email: 'teste@teste.com',
      password: '123'
    }


    expect(
      async () => {
        await registerUseUseCase.execute(user)
      }

    ).rejects.toBeInstanceOf(AppError)

  })

})