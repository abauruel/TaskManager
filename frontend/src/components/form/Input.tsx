import { FieldError } from 'react-hook-form'
import { FormControl, FormLabel, FormErrorMessage, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ name, label, error, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraInput
          name={name}
          focusBorderColor='teal.500' bg="gray.900" variant='filled'
          _hover={{
            bgColor: 'gray.900'
          }}
          size='lg'
          ref={ref}
          {...rest}
        />
        {!!error && (
          <FormErrorMessage color='pink'>
            {error.message}
          </FormErrorMessage>
        )}
      </FormControl>
    )
  }

export const Input = forwardRef(InputBase)