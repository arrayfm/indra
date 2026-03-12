import { cn } from '@/lib/utils/class-name'
import { Card } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { IconType } from 'react-icons/lib'
import { StringInputProps, StringSchemaType, set } from 'sanity'

interface Options {
  options: {
    list: {
      value: string | number
      icon?: React.ComponentType | IconType
    }[]
  }
}

export interface IconButtonSelectorProps
  extends Omit<StringInputProps, 'schemaType'> {
  schemaType: Options & StringSchemaType
}

export const IconButtonSelector = (props: IconButtonSelectorProps) => {
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
      <div className="flex flex-wrap gap-1 align-top">
        {options?.list?.map((option, index) => (
          <div
            className={cn(
              'rounded-xs relative flex items-center gap-1 border p-1',
              {
                'border-sanity-ui-info bg-sanity-ui-info text-white':
                  value === option.value,
                'border-black bg-white text-sanity-ui-info':
                  value !== option.value,
              }
            )}
            key={`${option.value}`}
          >
            <div className="svg pointer-events-none h-6 w-6">
              {option.icon && <option.icon />}
              {!option.icon && (
                <div
                  className={cn(
                    'absolute left-1/2 top-1/2 h-6 w-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45',
                    {
                      'bg-current': value === option.value,
                      'bg-sanity-ui-error': value !== option.value,
                    }
                  )}
                />
              )}
            </div>
            <input
              type="radio"
              checked={value === option.value}
              name={`${index}`}
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
