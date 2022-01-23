import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/appError";
import { ITaskRepository } from "../../../repositories/ITaskRepository";

@injectable()
class RemoveTaskUseCase {
  constructor(
    @inject("TaskRepository")
    private tasksRepository: ITaskRepository
  ) { }

  async execute(idTask: string): Promise<void> {
    const task = await this.tasksRepository.findById(idTask)
    if (!task) {
      throw new AppError("task not found")
    }

    if (task.finishDate) {
      throw new AppError("cannot update a task already finished")
    }

    await this.tasksRepository.deleteTask(task.id)

  }
}

export {
  RemoveTaskUseCase
}