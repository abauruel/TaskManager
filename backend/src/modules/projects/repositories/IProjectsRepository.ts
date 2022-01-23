import { Project } from "@prisma/client";
import { IProjectDto } from "../dtos/ProjectDto";

interface IProjectCreate {
  name: string,
  idUser: number
}



interface IProjectsRepository {
  create({ name, idUser }: IProjectCreate): Promise<void>
  findById(id: string): Promise<IProjectDto | null | undefined>
  findAllByUser(idUser: number): Promise<Project[]>
  updateProject(project: IProjectDto): Promise<void>
  deleteProject(idProject: string): Promise<void>
}

export { IProjectsRepository, IProjectCreate }