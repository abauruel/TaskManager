import { Request, Response } from "express";
import { container } from "tsyringe";
import { FinishTaskUseCase } from "./FinishTaskUseCase";

class FinishTaskController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idTask } = request.params
    const finishTaskUseCase = container.resolve(FinishTaskUseCase)
    await finishTaskUseCase.execute(idTask)

    return response.status(201).send()
  }
}
export {
  FinishTaskController
}