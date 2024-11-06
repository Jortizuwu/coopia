import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { toast } from 'sonner'

import authServices from '@/shared/services/auth'
import usePersistedStore from '@/store'

export const FormSchema = z.object({
  username: z.string({
    required_error: 'username required',
  }),
  password: z.string({
    required_error: 'password required',
  }),
})

export type FormType = z.infer<typeof FormSchema>

const initialValues = {
  username: '',
  password: '',
}

export function useDefaultValues() {
  const navigate = useNavigate()
  const { setToken } = usePersistedStore()

  const update = useCallback(
    async ({ username, password }: FormType) => {
      try {
        const { status } = await authServices.login(username, password)
        setToken({
          status: status,
        })
        navigate('/', {
          replace: true,
        })
        toast('Iniciando sesión', {
          description: 'Iniciando sesión',
          style: { background: '#6FCF97', color: '#fff' },
        })
      } catch (error) {
        toast('Error al iniciar sesión', {
          description: 'error al iniciar sesión, intente de nuevo',
          style: { background: '#E67071', color: '#fff' },
        })
        setToken({
          status: "status",
        })
        navigate('/', {
          replace: true,
        })
        console.error(error)
      }
    },
    [navigate, setToken],
  )

  const { mutateAsync, isLoading: isLoadingMutation } = useMutation(update, {
    onSuccess: () => {},
  })

  return {
    isLoading: isLoadingMutation,
    submit: mutateAsync,
    formValues: {
      defaultValues: initialValues,
    },
  }
}
