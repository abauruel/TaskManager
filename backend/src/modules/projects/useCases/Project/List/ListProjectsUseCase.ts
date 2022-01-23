import { Project } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/appError";
import { IProjectsRepository } from "../../../repositories/IProjectsRepository";

@injectable()
class ListProjectsUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository
  ) { }

  async execute(idUser: number): Promise<Project[]> {
    if (!idUser) {
      throw new AppError("user cannot be empty!")
    }
    const projects = await this.projectsRepository.findAllByUser(idUser)
    return projects

  }
}

export {
  ListProjectsUseCase
}