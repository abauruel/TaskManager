import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTasksUseCase } from "./ListTasksUseCase";

class ListTasksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: idProject } = request.params
    const listTasksUseCase = container.resolve(ListTasksUseCase)
    const tasks = await listTasksUseCase.execute(idProject)
    return response.json(tasks)

  }
}
export {
  ListTasksController
}