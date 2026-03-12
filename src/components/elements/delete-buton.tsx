import { useState } from 'react'

import { TrashIcon } from '@radix-ui/react-icons'
import Modal from '../modals/modal-lower'

import { cn } from '@/lib/utils/class-name'
import { getFontSize } from '@/lib/utils/theme'
import { Button } from '../ui/button'
import { SVG } from './svg'

export const DeleteButton: React.FC<{
  message?: string
  onDeleteConfirm: () => void
}> = ({ message, onDeleteConfirm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        className="hover:bg-mono-800 flex h-5 w-5 items-center justify-center rounded-xs bg-black p-1 text-white"
        onClick={() => setIsModalOpen(true)}
      >
        <SVG width={14} height={14}>
          <TrashIcon />
        </SVG>
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex min-h-48 w-full max-w-lg flex-col justify-between gap-4 rounded-xs bg-white p-4">
          <div className="flex flex-col gap-2">
            <p className={cn(getFontSize('lg'))}>
              Are sure want to delete this?
            </p>
            {message && (
              <p className={cn(getFontSize('md'), 'text-mono-500')}>
                {message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                onDeleteConfirm() // Trigger API call
                setIsModalOpen(false)
              }}
              theme="black"
            >
              Delete
            </Button>
            <Button onClick={() => setIsModalOpen(false)} theme="mono-300">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
