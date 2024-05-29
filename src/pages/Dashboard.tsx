import { LogOut } from 'lucide-react'
import { removeCookie } from '../cookies'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

export function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error(error)
    } finally {
      removeCookie('token')
      navigate('/')
    }
  }

  return (
    <div className="flex h-full w-full flex-col">
      <nav className="items-centers relative flex justify-between px-10 pt-2 text-lg">
        <span className="self-center font-bold">Olá, usuário</span>
        <button
          className="flex gap-2 rounded-md bg-primary px-2 py-1 text-base text-white drop-shadow-md"
          onClick={handleLogout}
        >
          <LogOut size={24} /> Sair
        </button>
      </nav>
      <span className="mt-2 flex h-[1px] w-full border border-gray-400/60" />
      <div className="mx-auto flex h-full gap-5 pt-5 lg:gap-20">
        <div className="h-[40rem] w-56 animate-pulse rounded-md bg-gray-400 md:w-56 lg:w-80" />

        <div className="hidden grid-cols-2 grid-rows-2 gap-x-10 md:grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex h-56 w-56 animate-pulse items-center justify-center self-center rounded-full bg-gray-400"
            >
              <div className="flex h-48 w-48 self-center rounded-full bg-background" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
