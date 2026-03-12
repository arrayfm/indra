import { cn } from '@/lib/utils/class-name'
import { useState } from 'react'

type SwitchInputProps = {
  id?: string
  label?: string
  name?: string
  checked?: boolean
  required?: boolean
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const SwitchInput = (props: SwitchInputProps) => {
  const { label, id, name, checked, onChange, required, disabled, ...rest } =
    props

  const [isChecked, setIsChecked] = useState(checked)

  return (
    <div
      className={cn('relative flex h-[20px] w-[36px] items-center gap-2', {
        'opacity-20': disabled,
      })}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        required={required}
        disabled={disabled}
        className="absolute top-0 left-0 z-20 h-full w-full cursor-pointer opacity-0"
        onChange={onChange}
        onClick={() => setIsChecked(!isChecked)}
        {...rest}
      />
      <div
        className={cn(
          'switch absolute top-0 left-0 h-full w-full rounded-full transition-all duration-300',
          {
            'bg-mono-200': !isChecked,
            'bg-dark-blue': isChecked,
          }
        )}
      />
      <div
        className={cn(
          'z-10 h-[14px] w-[14px] rounded-full bg-white transition-transform duration-300',
          {
            'translate-x-[4px]': !isChecked,
            'translate-x-[18px]': isChecked,
          }
        )}
      />
    </div>
  )
}
