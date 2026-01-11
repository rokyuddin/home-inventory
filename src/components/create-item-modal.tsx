"use client"

import { useState } from "react"
import { useCreateInventory, useLabels, useLocations, useCreateLocation, useCreateLabel } from "@/hooks/use-inventory"
import { Dialog } from "./ui/dialog"
import Input from "./ui/input"
import { Button } from "./ui/button"
import { Select } from "./ui/select"
import { Loader2 } from "lucide-react"

interface CreateItemModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateItemModal({ isOpen, onClose }: CreateItemModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [locationId, setLocationId] = useState("")
  const [labelIds, setLabelIds] = useState<string[]>([]) 

  const [isCreatingLocation, setIsCreatingLocation] = useState(false)
  const [newLocationName, setNewLocationName] = useState("")
  const [isCreatingLabel, setIsCreatingLabel] = useState(false)
  const [newLabelName, setNewLabelName] = useState("")

  const { data: locations } = useLocations()
  const { data: labels } = useLabels()
  const createInventoryMutation = useCreateInventory()
  const createLocationMutation = useCreateLocation()
  const createLabelMutation = useCreateLabel()

  const handleCreateLocation = async () => {
    if (!newLocationName) return
    try {
        const newLoc = await createLocationMutation.mutateAsync({ name: newLocationName })
        setNewLocationName("")
        setIsCreatingLocation(false)
        setLocationId(newLoc.id) // Auto select
    } catch (e) {
        console.error("Failed to create location", e)
    }
  }

  const handleCreateLabel = async () => {
    if (!newLabelName) return
    try {
        const newLabel = await createLabelMutation.mutateAsync({ name: newLabelName })
        setNewLabelName("")
        setIsCreatingLabel(false)
        setLabelIds(prev => [...prev, newLabel.id]) // Auto select
    } catch (e) {
        console.error("Failed to create label", e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !quantity || !locationId) return

    try {
      await createInventoryMutation.mutateAsync({
        name,
        description,
        quantity: Number(quantity),
        locationId,
        labelIds: labelIds, 
      })
      onClose()
      // Reset form
      setName("")
      setDescription("")
      setQuantity(1)
      setLocationId("")
      setLabelIds([])
    } catch (error) {
      console.error("Failed to create item", error)
    }
  }

  // Handle multi-select for labels (simplified as native multiple select)
  const handleLabelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
    setLabelIds(selectedOptions)
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Add New Item">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input 
                value={name} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                placeholder="Item name" 
                required 
            />
        </div>
        
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Input 
                value={description} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} 
                placeholder="Description (optional)" 
            />
        </div>

        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <Input 
                type="number" 
                min="1"
                value={quantity} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.valueAsNumber || 0)} 
                required 
            />
        </div>

        <div className="space-y-1">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <button type="button" onClick={() => setIsCreatingLocation(!isCreatingLocation)} className="text-xs text-blue-600 hover:text-blue-800">
                    {isCreatingLocation ? "Cancel" : "+ New Location"}
                </button>
            </div>
            
            {isCreatingLocation ? (
                 <div className="flex gap-2">
                    <Input 
                        value={newLocationName} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLocationName(e.target.value)} 
                        placeholder="New Location Name" 
                        className="flex-1"
                    />
                    <Button type="button" size="sm" onClick={handleCreateLocation} disabled={createLocationMutation.isPending}>
                        {createLocationMutation.isPending ? "..." : "Add"}
                    </Button>
                 </div>
            ) : (
                <Select
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    options={locations?.map(l => ({ label: l.name, value: l.id })) || []}
                    required
                    placeholder="Select a location"
                />
            )}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">Labels</label>
            <button type="button" onClick={() => setIsCreatingLabel(!isCreatingLabel)} className="text-xs text-blue-600 hover:text-blue-800">
                {isCreatingLabel ? "Cancel" : "+ New Label"}
            </button>
          </div>

           {isCreatingLabel ? (
                 <div className="flex gap-2">
                    <Input 
                        value={newLabelName} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLabelName(e.target.value)} 
                        placeholder="New Label Name" 
                        className="flex-1"
                    />
                    <Button type="button" size="sm" onClick={handleCreateLabel} disabled={createLabelMutation.isPending}>
                        {createLabelMutation.isPending ? "..." : "Add"}
                    </Button>
                 </div>
            ) : (
                <select
                    multiple
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm h-24"
                    value={labelIds}
                    onChange={handleLabelChange}
                >
                    {labels?.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                </select>
            )}
            
          <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={createInventoryMutation.isPending}>
            {createInventoryMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Create Item
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
