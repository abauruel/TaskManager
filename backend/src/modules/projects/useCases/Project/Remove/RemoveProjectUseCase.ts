import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../../shared/errors/appError"
import { IProjectsRepository } from "../../../repositories/IProjectsRepository"
import { ITaskRepository } from "../../../repositories/ITaskRepository"

@injectable()
class RemoveProjectUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,

    @inject("TaskRepository")
    private tasksRepository: ITaskRepository
  ) { }
  async execute(idProject: string, idUser: number): Promise<void> {

    if (!idProject.trim()) {
      throw new AppError("project cannot be empty")
    }

    const project = await this.projectsRepository.findById(idProject)
    if (!project) {
      throw new AppError("project not found")
    }

    const isOwner = project.User_Project.find(user => user.idUser == idUser)
    if (!isOwner) {
      throw new AppError("you not able to delete project", 403)
    }

    const tasksProject = await this.tasksRepository.findTasksByProjectId(idProject)
    console.log(tasksProject)
    if (tasksProject.length > 0) {
      throw new AppError("Cannot delete projects with task already exist")
    }

    await this.projectsRepository.deleteProject(idProject)

  }
}

export {
  RemoveProjectUseCase
}