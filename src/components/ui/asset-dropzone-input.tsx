'use client'

import { ImageIcon } from '@radix-ui/react-icons'
import React from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'

import { SVG } from '../elements/svg'
import { cn } from '@/lib/utils/class-name'
import { LoadingSVG } from '../svg/loading'
import useMediaQuery from '@/lib/hooks/use-media-query'

export type AssetInputProps = {
  onUpload: (files: File[]) => void
  className?: string
  loading?: boolean
  icon?: React.ReactNode
  placeholder?: string
} & DropzoneOptions

export const AssetDropzoneInput: React.FC<AssetInputProps> = ({
  onUpload,
  className,
  loading = false,
  icon = <ImageIcon />,
  placeholder = 'Upload files',
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg'],
    'application/pdf': ['.pdf'],
    'application/zip': ['.zip'],
  },
  ...props
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...props,
    accept: accept,
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles)
    },
  })
  const isMobile = useMediaQuery(1024, 'max')

  return (
    <div {...getRootProps()} className={cn(className)}>
      <input {...getInputProps()} />
      <p>{loading ? 'Uploading...' : placeholder}</p>
      <SVG
        width={isMobile ? 20 : 36}
        height={isMobile ? 20 : 36}
        className={cn({
          'animate-spin': loading,
        })}
      >
        {loading ? <LoadingSVG /> : icon}
      </SVG>
    </div>
  )
}
