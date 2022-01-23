import { Task } from "@prisma/client";

interface ITask {
  id?: string
  description: string
  idProject: string
}

interface ITaskRepository {
  findById(id: string): Promise<Task | null | undefined>
  findTasksByProjectId(idProject: string): Promise<Task[]>
  create({ description, idProject }: ITask): Promise<void>
  updateTask(task: Task): Promise<void>
  deleteTask(idTask: string): Promise<void>
}

export { ITaskRepository }