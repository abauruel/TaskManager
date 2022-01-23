import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProjectUseCase } from "./CreateProjectUseCase";

class CreateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body
    const idUser = request.idUser
    const createProjectUseCase = container.resolve(CreateProjectUseCase)
    await createProjectUseCase.execute({ name, idUser })
    return response.status(201).send()
  }
}

export { CreateProjectController }