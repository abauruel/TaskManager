import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const authenticated = await authenticateUserUseCase.execute({ email, password })
    return response.json(authenticated)
  }
}

export { AuthenticateUserController }