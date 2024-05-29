import { Mail } from 'lucide-react'

interface EmailInputProps {
  label: string
  email: string
  onChangeEmail: (email: string) => void
  invalid?: boolean
  invalidMessage?: string
}

export function EmailInput({
  label,
  email,
  onChangeEmail,
  invalid,
  invalidMessage,
}: EmailInputProps) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <div className="relative">
        <Mail size={24} className="absolute left-2 top-4 text-gray-400" />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          className={`my-2 w-full rounded-md bg-gray-100 p-2 px-10 text-zinc-700 ring-1 ring-gray-300 focus-within:outline-none focus:ring-2 focus:ring-primary ${invalid && 'ring-red-500'}`}
        />
        {invalid && (
          <span className="text-sm text-red-500">{invalidMessage}</span>
        )}
      </div>
    </div>
  )
}
