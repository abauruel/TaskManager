import { Router } from 'express'
import { ensureAuthenticated } from '../../../middleware/ensureAuthenticated'
import { AuthenticateUserController } from '../../../modules/accounts/useCases/Authenticate/AuthenticateUserController'
import { RegisterUserController } from '../../../modules/accounts/useCases/Register/RegisterUserController'
import { ListTasksController } from '../../../modules/projects/useCases/Task/List/ListTasksController'
import { projectRoutes } from './projects.route'
import { taskRoutes } from './task.route'

const routes = Router()
const registerUserController = new RegisterUserController()

const authenticateUserController = new AuthenticateUserController()
const listTasksController = new ListTasksController()

routes.post('/register', registerUserController.handle)
routes.post('/session', authenticateUserController.handle)
routes.use(ensureAuthenticated)

routes.use(projectRoutes)
routes.use('/project/task', taskRoutes)
routes.get('/project/:id/tasks', listTasksController.handle)


export { routes }