import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalProps, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { api } from "../../services/api";

type CreateProjectProps = {
  isOpen: boolean
  onClose: () => void
}

export function CreateProject({ isOpen, onClose }: CreateProjectProps) {
  const initialRef = useRef<any>()
  const finalRef = useRef<any>()
  const [projectName, setProjectName] = useState("")

  async function handleNewProject(event: any) {
    event?.preventDefault()
    const token = localStorage.getItem('@taskManager:token')
    if (!projectName.trim()) {
      return
    }

    await api.post('/project', {
      name: projectName
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    onClose()
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="black">New project</FormLabel>
              <Input
                ref={initialRef}
                placeholder='project name'
                onChange={(e) => setProjectName(e.target.value)} />
            </FormControl>
            <Button colorScheme='blue' mr={3} mt={3} onClick={handleNewProject}>
              Save
            </Button>
            <Button onClick={onClose} mt={3}>Cancel</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}