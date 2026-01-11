'use client'

import { cn } from '@/lib/utils'
import { EllipsisVertical, Edit3, Move, Copy, Trash2, Eye } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import { InventoryItem } from '@/types/inventory'

export interface InventoryActionsProps {
  item?: InventoryItem
  onEdit?: (item?: InventoryItem) => void
  onMove?: (item?: InventoryItem) => void
  onCopy?: (item?: InventoryItem) => void
  onRemove?: (item?: InventoryItem) => void
}

export default function InventoryActions({ 
  item,
  onEdit,
  onMove,
  onCopy,
  onRemove 
}: InventoryActionsProps) {
  const [open, setOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router =useRouter()
  const onToggle = () => setOpen((prev) => !prev)
  const onClose = () => setOpen(false)

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Keyboard navigation
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose()
        buttonRef.current?.focus()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])


  const handleView = () => {
    router.push(`/dashboard/inventory/${item?.id}`)
    onClose()
  }

  // Action handlers with close
  const handleEdit = () => {
    onEdit?.(item)
    onClose()
  }

  const handleMove = () => {
    onMove?.(item)
    onClose()
  }

  const handleCopy = () => {
    onCopy?.(item)
    onClose()
  }

  const handleRemove = () => {
    onRemove?.(item)
    onClose()
  }



  return (
    <div className='relative'>
      <Button 
        ref={buttonRef}
        onClick={onToggle}
        variant="ghost"
        size="icon"
        className={cn(
          'p-2 h-9 w-9 text-[#64748B]',
          open && 'bg-[#F1F5F9] text-[#334155]'
        )}
        aria-label="Open actions menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <EllipsisVertical className="w-5 h-5" />
      </Button>

      {/* Dropdown Menu */}
      <div 
        ref={dropdownRef}
        className={cn(
          'absolute right-0 z-50 mt-2 w-56 origin-top-right',
          'rounded-xl bg-white shadow-xl',
          'border border-[#CBD5E1]',
          'transition-all duration-200 ease-out',
          open 
            ? 'opacity-100 scale-100 visible' 
            : 'opacity-0 scale-95 invisible pointer-events-none'
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="actions-menu"
      >
        <div className='py-2'>
          <ActionMenuItem
            icon={<Eye className="size-4" />}
            label="View"
            onClick={handleView}
            variant="default"
          />
          <ActionMenuItem
            icon={<Edit3 className="size-4" />}
            label="Edit"
            onClick={handleEdit}
            variant="default"
          />
          <ActionMenuItem
            icon={<Move className="size-4" />}
            label="Move"
            onClick={handleMove}
            variant="default"
          />
          <ActionMenuItem
            icon={<Copy className="size-4" />}
            label="Copy"
            onClick={handleCopy}
            variant="default"
          />
          
          {/* Divider */}
          <div className="my-2 border-t border-[#F1F5F9]" />
          
          <ActionMenuItem
            icon={<Trash2 className="size-4" />}
            label="Remove"
            onClick={handleRemove}
            variant="danger"
          />
        </div>
      </div>
    </div>
  )
}

// Action Menu Item Component
interface ActionMenuItemProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: 'default' | 'danger'
  disabled?: boolean
}

function ActionMenuItem({ 
  icon, 
  label, 
  onClick, 
  variant = 'default',
  disabled = false 
}: ActionMenuItemProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full justify-start gap-3 px-4 py-2.5 rounded-none border-none ring-0 shadow-none',
        variant === 'danger' && 'text-red-600 hover:bg-red-50 hover:text-red-700'
      )}
      leftIcon={icon}
      role="menuitem"
    >
      <span>{label}</span>
    </Button>
  )
}
