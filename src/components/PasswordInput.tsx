import { Eye, EyeOff, KeyRound } from 'lucide-react'
import { useState } from 'react'

interface PasswordInputProps {
  label: string
  placeholder?: string
  password: string
  onChangePassword: (password: string) => void
  invalid?: boolean
  invalidMessage?: string
}

export function PasswordInput({
  label,
  placeholder = 'senha',
  password,
  onChangePassword,
  invalid = false,
  invalidMessage,
}: PasswordInputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <div>
      <label className="font-semibold">{label}</label>
      <div className="relative">
        <KeyRound size={24} className="absolute left-2 top-4 text-gray-400" />
        <input
          type={isShowPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          className={`my-2 w-full rounded-md bg-gray-100 p-2 px-10 font-medium text-zinc-700 ring-1 ring-gray-300 focus-within:outline-none focus:border-0 focus:ring-2 focus:ring-primary ${invalid && 'ring-red-500'}`}
        />
        {invalid && (
          <span className="text-sm text-red-500">{invalidMessage}</span>
        )}
        {isShowPassword ? (
          <button
            type="button"
            onClick={() => setIsShowPassword(false)}
            className="absolute right-2 top-4"
          >
            <EyeOff size={24} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsShowPassword(true)}
            className="absolute right-2 top-4"
          >
            <Eye size={24} />
          </button>
        )}
      </div>
    </div>
  )
}
