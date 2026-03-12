'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/class-name'
import { AssetDropzoneInput } from '../ui/asset-dropzone-input'
import { Button } from '../ui/button'

export const AssetUpload = ({ type = 's3' }: { type: 's3' }) => {
  const [activeTab, setActiveTab] = useState('upload')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const uploadFileToServer = async (file: File) => {
    if (!file) return

    setUploading(true)

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    )

    if (response.ok) {
      const { url, fields } = await response.json()

      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      formData.append('file', file)

      for (const [key, value] of formData.entries()) {
        console.log(`FormData contains: ${key} = ${value}`)
      }

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        alert('Upload successful!')
      } else {
        console.log('S3 Upload Error:', await uploadResponse.text())
        alert('Upload failed.')
      }
    } else {
      alert('Failed to get pre-signed URL.')
    }

    setUploading(false)
  }

  const handleFileUpload = async (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      await uploadFileToServer(files[0])
    }
  }

  return (
    <form className="flex min-h-[400px] flex-col gap-1">
      <div className="flex gap-1">
        <Button
          onClick={() => setActiveTab('media')}
          theme={activeTab === 'media' ? 'black' : 'mono-100'}
        >
          Media
        </Button>
        <Button
          onClick={() => setActiveTab('upload')}
          theme={activeTab === 'upload' ? 'black' : 'mono-100'}
        >
          Upload
        </Button>
      </div>
      {activeTab === 'media' && (
        <div
          className={cn(
            'bg-mono-100 flex min-h-[200px] flex-grow items-center justify-center rounded-sm p-5 text-center transition-all'
          )}
        >
          <p className={cn('text-sm')}>Media</p>
        </div>
      )}
      {activeTab === 'upload' && (
        <AssetDropzoneInput onUpload={handleFileUpload} />
      )}
      {file && (
        <div className="mt-2 text-sm">
          <p>Selected file: {file.name}</p>
        </div>
      )}
    </form>
  )
}
