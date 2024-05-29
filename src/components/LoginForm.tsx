import { useState } from 'react'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { api } from '../lib/api'
import { setCookie } from '../cookies'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface LoginFormProps {
  handleToggle: () => void
}

export function LoginForm({ handleToggle }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleEmailChange(email: string) {
    setEmail(email)
  }

  function handlePasswordChange(password: string) {
    setPassword(password)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const response = await api.post('/login', {
        email,
        password,
      })

      if (response.data.access_token) {
        setCookie('token', response.data.access_token)
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error)
      toast.error('Email ou senha inválidos')
    }
  }

  return (
    <>
      <h1 className="self-center text-xl font-semibold">Faça login</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 p-5"
      >
        <EmailInput
          email={email}
          onChangeEmail={handleEmailChange}
          label="Email"
        />
        <PasswordInput
          password={password}
          onChangePassword={handlePasswordChange}
          label="Senha"
        />

        <button
          type="submit"
          className="my-2 w-full rounded-md bg-primary p-2 text-lg font-bold text-white"
        >
          Login
        </button>
      </form>

      <div className="flex justify-center">
        <span className="text-gray-500">
          Não tem conta?{' '}
          <button className="text-primary" onClick={handleToggle}>
            Registre-se
          </button>
        </span>
      </div>
    </>
  )
}
