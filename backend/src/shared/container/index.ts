import { container } from 'tsyringe'
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { ProjectsRepository } from '../../modules/projects/repositories/implementations/ProjectsRepository'
import { TaskRepository } from '../../modules/projects/repositories/implementations/TaskRepository'
import { IProjectsRepository } from '../../modules/projects/repositories/IProjectsRepository'
import { ITaskRepository } from '../../modules/projects/repositories/ITaskRepository'

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)
container.registerSingleton<IProjectsRepository>("ProjectsRepository", ProjectsRepository)
container.registerSingleton<ITaskRepository>("TaskRepository", TaskRepository)