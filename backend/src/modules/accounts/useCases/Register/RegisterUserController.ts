import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RegisterUserUseCase } from './RegisterUserUseCase'
class RegisterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const registerUserUseCase = container.resolve(RegisterUserUseCase)
    await registerUserUseCase.execute({ name, email, password })
    return response.status(201).send()
  }
}

export { RegisterUserController }