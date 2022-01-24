import { Button, Flex, FormErrorMessage, Stack, useToast, Text } from '@chakra-ui/react'
import { Input } from '../components/form/Input'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { api } from '../services/api'
import { useNavigate, Link } from 'react-router-dom'

type SignInFormData = {
  email: string,
  password: string
}

export function SignUp() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm()
  const toast = useToast()
  const { errors } = formState

  const handleSignUp: SubmitHandler<FieldValues> = async (values) => {
    const { email, password, name } = values
    try {
      const response = await api.post('register', {
        email, password, name
      })

      navigate('/')

    } catch (err: any) {
      console.log(err.response.data.message)
      toast({
        status: "error",
        description: `${err.response.data.message}`,
        isClosable: true
      })
    }
  }

  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      alignItems="center"
      justifyContent="center"

    >

      <Flex
        as="form"
        w={"100%"}
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection='column'
        onSubmit={handleSubmit(handleSignUp)}
      >

        <Stack spacing='4'>
          <Input type='email' label='E-mail' id="email"
            error={errors.email}
            {...register("email")} />
          <Input type='name' label='Name' id="name"
            error={errors.name}
            {...register("name")} />

          <Input type='password' label='Password' id="password"
            error={errors.password}
            {...register("password")}
          />

        </Stack>

        <Button
          type="submit"
          marginTop="6"
          colorScheme='teal'
          isLoading={formState.isSubmitting}
        >Register</Button>

      </Flex>
    </Flex>

  )
}