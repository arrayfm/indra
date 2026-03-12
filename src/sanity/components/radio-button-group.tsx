import { cn } from '@/lib/utils/class-name'
import { Card, Label } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { IconType } from 'react-icons/lib'
import { StringInputProps, StringSchemaType, set } from 'sanity'

interface Options {
  options: {
    list: {
      title?: string
      value: string | number
      icon?: React.ComponentType | IconType
    }[]
  }
}

export interface RadioButtonGroupProps
  extends Omit<StringInputProps, 'schemaType'> {
  schemaType: Options & StringSchemaType
}

export const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  const {
    value: initialValue,
    schemaType: { options },
    onChange,
  } = props

  const [value, setValue] = useState(initialValue)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value
      setValue(newValue)
      onChange(set(newValue)) // call onChange with the new value
    },
    [onChange] // ensure the callback is stable
  )

  return (
    <Card style={{ textAlign: 'left' }}>
      <div className="flex align-top">
        {options?.list?.map((option) => (
          <div
            className={cn(
              'relative flex items-center gap-1 border-b border-l border-t px-3 first:rounded-l-sm last:rounded-r-sm last:border-r',
              {
                'border-sanity-ui-info bg-sanity-ui-info text-white':
                  value === option.value,
                'border-black bg-white': value !== option.value,
                'py-1.5': !!option.title,
                'py-3': !option.title,
              }
            )}
            key={`${option.value}`}
          >
            {option.title && (
              <label key={option.title.toString()} className="text-[12px]">
                {option.title}
              </label>
            )}
            {option.icon && (
              <div className="svg pointer-events-none">
                {option.icon && <option.icon />}
              </div>
            )}
            <input
              type="radio"
              checked={value === option.value}
              name={`${option.title || option.value}`}
              onChange={handleChange}
              value={option.value}
              className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
