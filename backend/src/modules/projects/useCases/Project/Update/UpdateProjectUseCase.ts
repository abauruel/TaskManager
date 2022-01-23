import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/appError";
import { IProjectsRepository } from "../../../repositories/IProjectsRepository";


interface IUpdateProject {
  name: string,
  idProject: string,
  idUser: number
}
@injectable()
class UpdateProjectUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository


  ) { }

  async execute({ name, idProject, idUser }: IUpdateProject): Promise<void> {
    const project = await this.projectsRepository.findById(idProject)
    console.log(project)
    if (!project) {
      throw new AppError("projects does not exist")
    }

    if (!name.trim()) {
      throw new AppError("name cannot be empty!")
    }
    const owned = project.User_Project.find(user => user.idUser == idUser)
    if (!owned) {
      throw new AppError("you not able to update this project", 403)
    }
    project.name = name
    await this.projectsRepository.updateProject(project)

  }
}


export {
  UpdateProjectUseCase
}