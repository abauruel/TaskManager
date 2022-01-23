import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProjectUseCase } from "./UpdateProjectUseCase";

class UpdateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body
    const { id: idProject } = request.params
    const idUser = Number(request.idUser)
    const updateProjectUseCase = container.resolve(UpdateProjectUseCase)
    await updateProjectUseCase.execute({ name, idProject, idUser })
    return response.status(201).send()
  }
}

export {
  UpdateProjectController
}