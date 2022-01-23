import { inject, injectable } from "tsyringe";
import { IProjectsRepository } from "../../repositories/IProjectsRepository";
import { ITaskRepository } from "../../repositories/ITaskRepository";

interface ICreateTask {
  idProject: string,
  description: string
}

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("TaskRepository")
    private tasksRepository: ITaskRepository

  ) { }
  async execute({ idProject, description }: ICreateTask): Promise<void> {
    await this.tasksRepository.create({
      description,
      idProject
    })
  }

}

export { CreateTaskUseCase }