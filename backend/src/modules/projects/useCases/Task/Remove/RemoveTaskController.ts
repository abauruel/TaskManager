import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveTaskUseCase } from "./RemoveTaskUseCase";

class RemoveTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idTask } = request.params
    const removeTaskUseCase = container.resolve(RemoveTaskUseCase)
    await removeTaskUseCase.execute(idTask)

    return response.status(201).send()
  }
}
export {
  RemoveTaskController
}