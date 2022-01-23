import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase";

class UpdateTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description } = request.body
    const { id } = request.params
    const updateTaskUseCase = container.resolve(UpdateTaskUseCase)
    await updateTaskUseCase.execute({ id, description })

    return response.status(201).send()
  }
}

export {
  UpdateTaskController
}