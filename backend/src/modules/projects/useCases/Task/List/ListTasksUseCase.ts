import { Task } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../../../repositories/ITaskRepository";
@injectable()
class ListTasksUseCase {

  constructor(
    @inject("TaskRepository")
    private tasksRepository: ITaskRepository
  ) {

  }
  async execute(idProject: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.findTasksByProjectId(idProject)
    return tasks

  }
}

export { ListTasksUseCase }