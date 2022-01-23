import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProjectsUseCase } from "./ListProjectsUseCase";

class ListProjectsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const idUser = request.idUser
    const listProjectsUseCase = container.resolve(ListProjectsUseCase)
    const projects = await listProjectsUseCase.execute(idUser)
    return response.json(projects)
  }
}

export {
  ListProjectsController
}