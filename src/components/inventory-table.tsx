"use client"
import Image from 'next/image'
import { ChevronRight, Loader2 } from 'lucide-react'
import InventoryActions from './inventory-actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge, BadgeVariant } from './ui/badge'
import Pagination from './ui/pagination'
import { InventoryItem, Label } from '@/types/inventory'

interface InventoryTableProps {
  items: InventoryItem[];
  isLoading: boolean;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function InventoryTable({
  items,
  isLoading,
  total,
  page,
  pageSize,
  onPageChange
}: InventoryTableProps) {
  
  const getBadgeVariant = (label: Label | string): BadgeVariant => {
    const name = typeof label === 'string' ? label : label.name;
    const l = name.toLowerCase();
    if (l.includes('tools') || l.includes('power')) return 'info';
    if (l.includes('warranty')) return 'success';
    if (l.includes('electronics')) return 'purple';
    if (l.includes('appliances')) return 'warning';
    if (l.includes('outdoor')) return 'teal';
    if (l.includes('seasonal')) return 'yellow';
    if (l.includes('high value')) return 'pink';
    return 'default';
  }

  const formatLocation = (location: InventoryItem['location']) => {
    if (!location) return <span className="text-sm text-[#64748B]">-</span>;
    // Location is object: { name, ... }
    const parts = location.name ? location.name.split(' > ') : [];
    if (parts.length <= 1) return <span className="text-sm text-[#64748B]">{location.name}</span>;
    return (
      <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
        <span>{parts[0]}</span>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span>{parts[1]}</span>
      </div>
    );
  }

  const formatRelativeTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  // Action handlers
  const handleEdit = (item?: InventoryItem) => console.log('Edit item:', item);
  const handleMove = (item?: InventoryItem) => console.log('Move item:', item);
  const handleCopy = (item?: InventoryItem) => console.log('Copy item:', item);
  const handleRemove = (item?: InventoryItem) => console.log('Remove item:', item);

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      <div className='flex-1 flex mt-10 px-6 overflow-auto'>
      <Table containerClassName='flex-1 bg-white border border-[#F1F5F9] rounded-lg'>
        <TableHeader className="bg-slate-100 hover:bg-slate-100 sticky top-0 z-10">
          <TableRow>
            <TableHead className="w-12">
              <input type="checkbox" className="rounded border-slate-300 accent-blue-600 cursor-pointer" />
            </TableHead>
            <TableHead className="min-w-[200px]">Item</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Labels</TableHead>
            <TableHead className="text-right pr-8">Quantity</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex justify-center items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                  <span className="text-slate-500">Loading inventory...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                No items found.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
            <TableRow key={item.id} className="group transition-colors">
              <TableCell>
                <input type="checkbox" className="rounded border-slate-300 accent-blue-600 cursor-pointer" />
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-4 py-1'>
                  <div className="relative w-12 h-12 rounded-lg bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                    <Image 
                      src={item.image || "/product-placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className='font-bold text-[#1E293B] leading-snug truncate max-w-[200px]'>{item.name}</span>
                    {item.model && <span className='text-[11px] text-[#64748B]'>Model: {item.model}</span>}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {formatLocation(item.location)}
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2 flex-wrap max-w-[250px]'>
                  {item.labels && item.labels.map((label, idx) => (
                    <Badge key={label.id || idx} variant={getBadgeVariant(label)}>
                      {label.name}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right pr-8">
                <span className='font-bold text-[#0F172A]'>{item.quantity}</span>
              </TableCell>
              <TableCell>
                <span className='text-[#64748B] text-sm'>{formatRelativeTime(item.updatedAt)}</span>
              </TableCell>
              <TableCell>
                <InventoryActions 
                  item={item}
                  onEdit={handleEdit}
                  onMove={handleMove}
                  onCopy={handleCopy}
                  onRemove={handleRemove}
                />
              </TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
      </div>

      <div className="shrink-0 bg-white border-t border-[#F1F5F9]">
        <Pagination 
          totalItems={total}
          itemsPerPage={pageSize}
          currentPage={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}
