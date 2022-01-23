import { Router } from 'express'
import { CreateProjectController } from '../../../modules/projects/useCases/Project/Create/CreateProjectController'
import { ListProjectsController } from '../../../modules/projects/useCases/Project/List/ListProjectsController'
import { RemoveProjectController } from '../../../modules/projects/useCases/Project/Remove/RemoveProjectController'
import { UpdateProjectController } from '../../../modules/projects/useCases/Project/Update/UpdateProjectController'

const projectRoutes = Router()
const createProjectController = new CreateProjectController()
const listProjectsController = new ListProjectsController()
const updateProjectController = new UpdateProjectController()
const removeProjectController = new RemoveProjectController()

projectRoutes.post('/project', createProjectController.handle)
projectRoutes.get('/project', listProjectsController.handle)
projectRoutes.patch('/project/:id', updateProjectController.handle)
projectRoutes.delete('/project/:id', removeProjectController.handler)

export { projectRoutes }