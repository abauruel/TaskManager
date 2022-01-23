import { Task } from "@prisma/client";
import { prisma } from "../../../../shared/infra/Prisma/prismaClient";
import { ITaskRepository } from "../ITaskRepository";
import { v4 as uuidV4 } from 'uuid'

class TaskRepository implements ITaskRepository {


  async findById(id: string): Promise<Task | null | undefined> {
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    })
    return task
  }

  async create(task: Task): Promise<void> {
    await prisma.task.create({
      data: {
        description: task.description,
        idProject: task.idProject,
        id: uuidV4()
      }
    })
  }
  async updateTask(task: Task): Promise<void> {
    await prisma.task.update({
      where: {
        id: task.id
      },
      data: {
        ...task
      }
    })
  }
  async deleteTask(idTask: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id: idTask
      }
    })
  }
  async findTasksByProjectId(idProject: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        idProject: {
          equals: idProject
        }
      }

    })

    return tasks
  }
}

export { TaskRepository }