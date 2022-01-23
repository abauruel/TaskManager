import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, idProject } = request.body

    const createTaskUseCase = container.resolve(CreateTaskUseCase)
    await createTaskUseCase.execute({ description, idProject })
    return response.status(201).send()
  }
}

export { CreateTaskController }