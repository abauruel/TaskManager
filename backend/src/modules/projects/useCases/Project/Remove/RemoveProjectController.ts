import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveProjectUseCase } from "./RemoveProjectUseCase";

class RemoveProjectController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { id: idProject } = request.params
    const idUser = Number(request.idUser)
    const removeProjectUseCase = container.resolve(RemoveProjectUseCase)
    await removeProjectUseCase.execute(idProject, idUser)
    return response.status(204).send()
  }
}

export {
  RemoveProjectController
}