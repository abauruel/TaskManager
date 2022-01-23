import { inject, injectable } from "tsyringe";
import { IProjectsRepository } from "../../../repositories/IProjectsRepository";

interface IProject {
  name: string,
  idUser: number
}

@injectable()
class CreateProjectUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository
  ) { }
  async execute({ name, idUser }: IProject): Promise<void> {
    await this.projectsRepository.create({ name, idUser })
  }
}


export {
  CreateProjectUseCase
}