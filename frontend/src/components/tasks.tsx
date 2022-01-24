import { Checkbox, Flex, Icon, List, Tooltip } from "@chakra-ui/react"
import { InfoOutlineIcon } from '@chakra-ui/icons'
type TaskProps = {
  id: string,
  description: string,
  finishDate?: string
}

type TasksProps = {
  tasks: TaskProps[]
  isActive: boolean
  handleFinishTask: (idTask: string) => void
}

export function Tasks({ tasks, isActive, handleFinishTask }: TasksProps) {

  async function handleClick(idTask: string) {
    if ((isActive) && (idTask.trim())) {
      handleFinishTask(idTask)
    }
  }

  return (
    <Flex>
      {tasks &&
        <List spacing={3}>
          {tasks?.map(task => (
            <div key={task.id}>
              <Checkbox
                onChange={() => handleClick(task.id)}
                defaultChecked={!isActive}
                isDisabled={!isActive}>{task.description}</Checkbox>
              {!isActive &&
                <Tooltip label={task.finishDate} placement='right-end'>
                  <InfoOutlineIcon />
                </Tooltip>
              }
            </div>
          ))}
        </List>
      }
    </Flex>
  )
}