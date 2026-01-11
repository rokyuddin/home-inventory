"use client"
import InventoryHeader from '@/components/inventory-header'
import InventoryTable from '@/components/inventory-table'
import { useDebounce } from '@/hooks/use-debounce'
import { useInventory } from '@/hooks/use-inventory'
import { useState } from 'react'

export default function InventoryView() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const pageSize = 10;

  const { data, isLoading } = useInventory({
    page,
    pageSize,
    q: debouncedSearch
  });

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1); // Reset to first page on search
  };

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      <InventoryHeader onSearch={handleSearch} />
      <InventoryTable 
        items={data?.items || []} 
        isLoading={isLoading} 
        total={data?.total || 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  )
}
