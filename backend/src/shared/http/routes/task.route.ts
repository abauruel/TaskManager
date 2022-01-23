import { Router } from 'express'
import { CreateTaskController } from '../../../modules/projects/useCases/Task/CreateTaskController'
import { RemoveTaskController } from '../../../modules/projects/useCases/Task/Remove/RemoveTaskController'
import { FinishTaskController } from '../../../modules/projects/useCases/Task/Update/FinishTaskController'
import { UpdateTaskController } from '../../../modules/projects/useCases/Task/Update/UpdateTaskController'

const taskRoutes = Router()
const createTaskController = new CreateTaskController()

const updateTaskController = new UpdateTaskController()
const finishTaskController = new FinishTaskController()
const removeTaskController = new RemoveTaskController()

taskRoutes.post('/', createTaskController.handle)

taskRoutes.put('/:id', updateTaskController.handle)
taskRoutes.patch('/:idTask', finishTaskController.handle)
taskRoutes.delete('/:idTask', removeTaskController.handle)

export {
  taskRoutes
}