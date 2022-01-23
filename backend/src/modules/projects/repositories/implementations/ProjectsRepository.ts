import { prisma } from "../../../../shared/infra/Prisma/prismaClient";
import { v4 as uuidV4 } from 'uuid'
import { IProjectCreate, IProjectsRepository } from "../IProjectsRepository";
import { Prisma, Project } from "@prisma/client";
import { IProjectDto } from "../../dtos/ProjectDto";

class ProjectsRepository implements IProjectsRepository {


  async create({ name, idUser }: IProjectCreate): Promise<void> {
    await prisma.project.create({
      data: {
        name,
        id: uuidV4(),
        User_Project: {
          create: {
            idUser
          }
        }
      }
    })
  }

  async findById(id: string): Promise<IProjectDto | null> {
    const project = await prisma.project.findUnique({
      where: {
        id: id
      },
      include: {
        User_Project: {
          select: {
            idUser: true,
            idProject: true
          }
        }
      }
    })

    return project
  }

  async findAllByUser(idUser: number): Promise<Project[]> {
    const projects = await prisma.project.findMany({
      where: {
        User_Project: {
          every: {
            idUser: {
              equals: idUser
            }
          }
        }
      }, include: {
        User_Project: {
          select: {
            idUser: true
          }
        }
      }
    })

    return projects
  }

  async updateProject(project: IProjectDto): Promise<void> {
    await prisma.project.update({
      where: {
        id: project.id
      },
      data: {
        name: project.name
      }
    })
  }

  async deleteProject(idProject: string): Promise<void> {

    await prisma.project.delete({
      where: {
        id: idProject
      }
    })
  }
}

export { ProjectsRepository }