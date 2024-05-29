import { useEffect, useState } from 'react'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'
import hero from '../assets/Illustration.svg'
import { getCookie } from '../cookies'
import { useNavigate } from 'react-router-dom'

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  function handleToggle() {
    setIsLogin(!isLogin)
  }

  useEffect(() => {
    getCookie('token') && navigate('/dashboard')
  }, [])

  return (
    <div className="flex h-screen w-screen items-center justify-evenly self-center">
      <img
        src={hero}
        alt="hero"
        className="hidden w-[20rem] self-center md:block lg:w-[30rem]"
      />
      <div
        className={`flex w-5/6 max-w-96 flex-col rounded-md bg-white px-2 py-5 drop-shadow-lg md:w-2/5`}
      >
        {isLogin ? (
          <LoginForm handleToggle={handleToggle} />
        ) : (
          <RegisterForm handleToggle={handleToggle} />
        )}
      </div>
    </div>
  )
}
