import { ChevronLeftCircle, User } from 'lucide-react'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../lib/api'
// import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../cookies'

interface RegisterFormProps {
  handleToggle: () => void
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export function RegisterForm({ handleToggle }: RegisterFormProps) {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const navigate = useNavigate()

  // const { login } = useAuth()

  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false)

  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState('')
  const [invalidEmailMessage, setInvalidEmailMessage] = useState('')

  function handleEmailChange(email: string) {
    setEmail(email)
  }

  function handlePasswordChange(password: string) {
    setPassword(password)
  }

  function handleConfirmPasswordChange(password: string) {
    setConfirmPassword(password)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setInvalidEmail(false)
    setInvalidPassword(false)
    setInvalidConfirmPassword(false)

    if (name.length === 0) {
      toast.error('Nome é obrigatório')

      return
    }

    if (!emailRegex.test(email)) {
      setInvalidEmail(true)
      setInvalidEmailMessage('Email inválido')
      toast.error('Email inválido')

      return
    }

    if (password.length < 6) {
      setInvalidPassword(true)
      setInvalidPasswordMessage('A senha deve ter no mínimo 6 caracteres')
      toast.error('A senha deve ter no mínimo 6 caracteres')

      return
    }

    if (password !== confirmPassword) {
      setInvalidPassword(true)
      setInvalidConfirmPassword(true)
      setInvalidPasswordMessage('As senhas não conferem')
      toast.error('As senhas não conferem')

      return
    }

    const data = {
      name,
      email,
      password,
      password_confirmation: confirmPassword,
      persistent: false,
    }

    try {
      const response = await api.post('/register', data)

      if (response.status === 422) {
        toast.error('Usuário já cadastrado')
        return
      }

      const token = response.data.access_token

      setCookie('token', token, 1)
      navigate('/dashboard')

      // login(token)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <ChevronLeftCircle
        className="cursor-pointer self-start text-primary"
        onClick={handleToggle}
      />
      <h1 className="self-center text-xl font-semibold">Cria sua conta</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 p-5"
      >
        <label>Nome</label>
        <div className="relative">
          <User size={24} className="absolute left-2 top-4 text-gray-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="nome"
            className={`my-2 w-full rounded-md bg-gray-100 p-2 px-10 font-medium text-zinc-700 ring-1 ring-gray-300 focus-within:outline-none focus:border-0 focus:ring-2 focus:ring-primary`}
          />
        </div>
        <EmailInput
          label="Email"
          email={email}
          onChangeEmail={handleEmailChange}
          invalid={invalidEmail}
          invalidMessage={invalidEmailMessage}
        />
        <PasswordInput
          password={password}
          onChangePassword={handlePasswordChange}
          label="Senha"
          invalid={invalidPassword}
          invalidMessage={invalidPasswordMessage}
        />
        <PasswordInput
          password={confirmPassword}
          onChangePassword={handleConfirmPasswordChange}
          label="Confirme a senha"
          placeholder="confirme sua senha"
          invalid={invalidConfirmPassword}
          invalidMessage={invalidPasswordMessage}
        />

        <button
          type="submit"
          className="my-2 w-full rounded-md bg-primary p-2 text-lg font-bold text-white"
        >
          Registrar
        </button>
      </form>

      <div className="flex justify-center">
        <span className="text-gray-500">
          já tem uma conta?{' '}
          <button className="text-primary" onClick={handleToggle}>
            Faça login
          </button>
        </span>
      </div>
    </>
  )
}
