import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../../services/api";


type NewTaskProps = {
  idProject: string
}
export function NewTask({ idProject }: NewTaskProps) {
  const [description, setDescription] = useState("")
  async function handleNewTask(idProject: string) {
    const token = localStorage.getItem('@taskManager:token')
    await api.post(`/project/task`, {
      description,
      idProject
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  return (
    <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
      <Input type='text' placeholder='task description' mr="4" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button type="button" mr="2" colorScheme="blue" onClick={() => handleNewTask(idProject)}>Salvar</Button>
    </Flex>
  )
}