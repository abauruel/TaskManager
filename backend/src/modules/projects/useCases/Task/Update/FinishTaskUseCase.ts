import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/appError";
import { ITaskRepository } from "../../../repositories/ITaskRepository";

@injectable()
class FinishTaskUseCase {

  constructor(
    @inject("TaskRepository")
    private tasksRepository: ITaskRepository
  ) { }
  async execute(idTask: string): Promise<void> {
    const task = await this.tasksRepository.findById(idTask)
    if (!task) {
      throw new AppError("task not found")
    }
    task.finishDate = new Date()
    await this.tasksRepository.updateTask(task)
  }
}



export { FinishTaskUseCase }