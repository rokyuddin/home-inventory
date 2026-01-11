"use client"
import { Download, Plus, Search } from 'lucide-react'
import { Button } from './ui/button'
import InventoryFilter from './inventory-filter'
import { Separator } from './ui/separator'

interface InventoryHeaderProps {
  onSearch?: (query: string) => void;
}


import { useState } from 'react'
import CreateItemModal from './create-item-modal'

export default function InventoryHeader({ onSearch }: InventoryHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="bg-white py-5 border-b border-[#F1F5F9] space-y-4 shrink-0">
        <div className='px-8 flex items-center justify-between gap-8 shrink-0'>
            <div className="flex items-center gap-12 flex-1">
              <h1 className="text-2xl font-bold text-[#0F172A]">Inventory</h1>
              
              <div className="relative flex-1 max-w-xl">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="size-5 text-[#94A3B8]" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl bg-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[15px] transition-all duration-200"
                  placeholder="Search items..."
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" leftIcon={<Download className="size-5" />}>
                Export
              </Button>
              <Button leftIcon={<Plus className="size-5" />} onClick={() => setIsModalOpen(true)}>
                Add Item
              </Button>
            </div>
        </div>
        <Separator className='my-4'/>
        <InventoryFilter />
      </header>
      
      <CreateItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
