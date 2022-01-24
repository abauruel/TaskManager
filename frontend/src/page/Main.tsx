import { Box, Button, Checkbox, Collapse, Flex, Input, Stack, useDisclosure, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Header } from '../components/header'
import { Tasks } from '../components/tasks'
import { api } from '../services/api'
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { CreateProject } from '../components/modal/CreateProject'
import { NewTask } from '../components/newTask'

type ProjectProps = {
  id: string
  name: string
}

type TaskProps = {
  id: string,
  description: string,
  finishDate?: string
}

export const Main = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [tasksActive, setTasksActive] = useState<TaskProps[]>([])
  const [tasksDone, setTasksDone] = useState<TaskProps[]>([])
  const [modalNewProject, setModalNewProject] = useState(false)
  const [projectSelected, setProjectSelected] = useState("")
  const toast = useToast()

  useEffect(() => {
    async function loadProjects() {
      const token = localStorage.getItem('@taskManager:token')
      const response = await api.get('project', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // const { id, name } = response.data as ProjectProps
      setProjects(response.data)
    }
    loadProjects()
  }, [])

  async function handleListTasks(idProject: string) {
    try {
      const token = localStorage.getItem('@taskManager:token')
      const response = await api.get(`/project/${idProject}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const tasks = response.data as TaskProps[]
      setTasksActive(tasks.filter(t => t.finishDate == null))
      setTasksDone(tasks.filter(t => t.finishDate))
      setProjectSelected(idProject)
    } catch (err: any) {
      console.log(err.response.data.message)
      toast({
        status: "error",
        description: err.response.data.message,
        isClosable: true
      })
    }
  }

  async function handleToFinishTask(idTask: string) {
    try {
      const token = localStorage.getItem('@taskManager:token')
      await api.patch(`/project/task/${idTask}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const NewtasksActive = tasksActive?.filter(task => task.id != idTask) || {}
      setTasksActive(NewtasksActive)
      const task = tasksActive?.find(task => task.id == idTask)
      if (task) {
        task.finishDate = new Date().toLocaleDateString()
        const taskDoneArr = tasksDone
        taskDoneArr.push(task)
        setTasksDone(taskDoneArr)
      }
    } catch (err: any) {
      console.log(err.response.data.message)
      toast({
        status: "error",
        description: err.response.data.message,
        isClosable: true
      })
    }
  }

  function handleShowModalNewProject() {
    setModalNewProject(!modalNewProject)
  }

  async function handleDeleteProject(idProject: string) {
    if (!idProject) {
      return
    }
    try {
      const token = localStorage.getItem('@taskManager:token')
      await api.delete(`/project/${idProject}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const newProjects = projects.filter(p => p.id != idProject)
      setProjects(newProjects)
    } catch (err: any) {
      console.log(err.response.data.message)
      toast({
        status: "error",
        description: err.response.data.message,
        isClosable: true
      })
    }
  }


  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex
        direction="column"
        w="100%"
        maxWidth={600}
        mx="auto"
        mt="4"
      >

        <Button
          onClick={handleShowModalNewProject}
          colorScheme='teal' variant='solid' leftIcon={<AddIcon />}>
          new project
        </Button>
        {projects?.map(p => (
          <Box key={p.id} width='600'>
            <Flex>
              <Stack spacing={4} direction={'row'} padding={4} alignItems="center">
                <Text onClick={() => handleListTasks(p.id)} cursor="pointer">{p.name}</Text>
                <EditIcon />
                <Button colorScheme="none" onClick={() => handleDeleteProject(p.id)}>
                  <DeleteIcon />
                </Button>

              </Stack>
            </Flex>

            <Collapse in={projectSelected == p.id} animateOpacity overflow-y="scroll">
              <Box
                p={4}
                color='white'
                bg='blackAlpha.100'
                rounded='md'
                shadow='md'

              >
                {tasksActive.length > 0 && <h2>Active</h2>}
                <Tasks tasks={tasksActive} isActive={true} handleFinishTask={handleToFinishTask} />
                {tasksDone.length > 0 &&
                  <h2>Done</h2>
                }
                <Tasks tasks={tasksDone} isActive={false} handleFinishTask={handleToFinishTask} />
              </Box>
              <NewTask idProject={p.id} />
            </Collapse>
          </Box>

        ))
        }

        <CreateProject isOpen={modalNewProject} onClose={handleShowModalNewProject} />
      </Flex>
    </Flex >
  )
}