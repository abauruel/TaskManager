import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/appError";
import { ITaskRepository } from "../../../repositories/ITaskRepository";

interface IUpdateTask {
  id: string,
  description: string
}

@injectable()
class UpdateTaskUseCase {
  constructor(
    @inject("TaskRepository")
    private tasksRepository: ITaskRepository
  ) { }
  async execute({ id, description }: IUpdateTask): Promise<void> {
    console.log(id)
    const task = await this.tasksRepository.findById(id)
    if (!task) {
      throw new AppError("task not found")
    }
    if (task.finishDate) {
      throw new AppError("cannot update a task already finished")
    }
    task.description = description
    await this.tasksRepository.updateTask(task)
  }
}

export { UpdateTaskUseCase }