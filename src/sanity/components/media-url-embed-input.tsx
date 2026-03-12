import { Stack, TextInput } from '@sanity/ui'
import { ObjectInputProps, set } from 'sanity'
import { useCallback, useState } from 'react'
import { getMediaEmbedUrl } from '@/lib/utils/video'

type MediaUrlEmbedInputProps = ObjectInputProps

export function MediaUrlEmbedInput(props: MediaUrlEmbedInputProps) {
  const { value: initialValue, onChange } = props

  const [value, setValue] = useState<{
    url?: string
    embedUrl?: string
    type?: 'youtube' | 'vimeo'
  }>(() => initialValue || {})
  const [url, setUrl] = useState<string>(value?.url || '')

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value: eventValue } = event.target

      const mediaUrlEmbedValue = getMediaEmbedUrl(eventValue)

      const newValue = {
        ...value,
        [name]: eventValue,
        ...mediaUrlEmbedValue,
      }

      setValue(newValue)
      onChange(set(newValue))
      setUrl(newValue.url || '')
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  )

  return (
    <Stack space={4}>
      <label className="text-[0.8125rem] font-medium" htmlFor="url">
        Embed URL
      </label>
      <TextInput value={url} name="url" onChange={handleInputChange} />
      {!!url && (
        <div className="relative w-full pb-[56.25%]">
          <iframe
            src={getMediaEmbedUrl(url).embedUrl}
            className="absolute left-0 top-0 h-full w-full object-cover object-center"
            width={720}
            height={405}
          />
        </div>
      )}
    </Stack>
  )
}
