import { cn } from '@/lib/utils/class-name'
import { Card } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { StringInputProps, StringSchemaType, set } from 'sanity'

interface Options {
  options: {
    list: {
      title?: string
      value: string | number
      color?: string
    }[]
  }
}

interface ColorInputGroupProps extends Omit<StringInputProps, 'schemaType'> {
  schemaType: Options & StringSchemaType
}

export const ColorInputGroup = (props: ColorInputGroupProps) => {
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
      onChange(set(newValue))
    },
    [onChange]
  )

  return (
    <Card style={{ textAlign: 'left' }}>
      <div className="flex gap-2 align-top">
        {options?.list?.map((option) => (
          <div
            className={cn('relative flex items-center gap-1')}
            key={`${option.value}`}
          >
            {option.title && (
              <label key={option.title.toString()} className="text-[12px]">
                {option.title}
              </label>
            )}
            {option.color && (
              <div
                style={{ background: option.color }}
                className={cn('h-9 w-9 rounded-full border-4', {
                  'border-sanity-ui-info': value === option.value,
                  'border-gray-100 ': value !== option.value,
                })}
              ></div>
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
