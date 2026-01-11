'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Pencil, 
  Paperclip, 
  Trash2, 
  Plus,
  Clock,
  ShieldCheck,
  Tag
} from 'lucide-react'
import React, { useState } from 'react'

export default function InventoryDetailsPage() {
  const [activeTab, setActiveTab] = useState('details')

  return (
    <div className="flex flex-col h-full bg-bg-main overflow-auto">
      {/* Top Header / Breadcrumbs */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#E2E8F0] bg-white">
        <div className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
          <span className="hover:text-[#0F172A] cursor-pointer">Inventory</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#0F172A]">Sony WH-1000XM4 Headphones</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="font-semibold" leftIcon={<Pencil className="w-4 h-4" />}>
            Edit
          </Button>
          <Button variant="outline" size="sm" className="font-semibold" leftIcon={<Paperclip className="w-4 h-4" />}>
            Add Attachment
          </Button>
          <Button variant="outline" size="sm" className="font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100" leftIcon={<Trash2 className="w-4 h-4" />}>
            Delete
          </Button>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Title and Badges */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-[#0F172A]">Sony WH-1000XM4 Headphones</h1>
          <div className="flex items-center gap-2">
            <Badge variant="info">Electronics</Badge>
            <Badge variant="teal">Active Warranty</Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-4/3 bg-slate-100 rounded-2xl border border-[#E2E8F0] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-slate-100 animate-pulse" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn(
                  "aspect-square bg-[#F1F5F9] rounded-xl border flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-all",
                  i === 1 ? "border-primary ring-2 ring-primary/20" : "border-[#E2E8F0]"
                )}>
                  <div className="w-full h-full bg-slate-50" />
                </div>
              ))}
              <button className="aspect-square bg-white rounded-xl border border-dashed border-[#CBD5E1] flex items-center justify-center text-[#94A3B8] hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right: Key Details Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#0F172A]">Key Details</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <DetailItem label="Location">
                <div className="flex items-center gap-2 text-[#475569] font-medium">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Living Room</span>
                </div>
              </DetailItem>

              <DetailItem label="Labels">
                <div className="flex items-center gap-2">
                  <Badge variant="info">Electronics</Badge>
                  <Badge variant="purple">Audio</Badge>
                  <Badge variant="warning">Premium</Badge>
                </div>
              </DetailItem>

              <div className="grid grid-cols-2 gap-6">
                <DetailItem label="Quantity">
                  <span className="text-[#0F172A] font-semibold text-lg">1</span>
                </DetailItem>
                <DetailItem label="Purchase Date">
                  <div className="flex items-center gap-2 text-[#475569] font-medium">
                    <Calendar className="w-4 h-4 text-[#64748B]" />
                    <span>March 15, 2024</span>
                  </div>
                </DetailItem>
              </div>

              <DetailItem label="Purchase Price">
                <span className="text-2xl font-bold text-[#0F172A]">$349.99</span>
              </DetailItem>

              <DetailItem label="Warranty">
                <Badge variant="teal">Active until March 15, 2026</Badge>
              </DetailItem>

              <DetailItem label="Notes">
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Purchased from Best Buy with extended warranty. Includes carrying case, 
                  charging cable, and audio cable. Serial number: 1234567890.
                </p>
              </DetailItem>
            </div>
          </div>
        </div>

        {/* Tabs and Tab Content */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="flex items-center border-b border-[#E2E8F0] bg-white">
            <TabButton 
              active={activeTab === 'details'} 
              onClick={() => setActiveTab('details')}
              label="Details"
            />
            <TabButton 
              active={activeTab === 'attachments'} 
              onClick={() => setActiveTab('attachments')}
              label="Attachments"
              count={3}
            />
            <TabButton 
              active={activeTab === 'activity'} 
              onClick={() => setActiveTab('activity')}
              label="Activity"
            />
          </div>

          <div className="p-8">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <section className="space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#94A3B8]">Product Information</h4>
                  <div className="space-y-4">
                    <InfoRow label="Brand" value="Sony" />
                    <InfoRow label="Model" value="WH-1000XM4" />
                    <InfoRow label="Color" value="Black" />
                    <InfoRow label="Condition" value="Excellent" />
                  </div>
                </section>

                <section className="space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#94A3B8]">Additional Details</h4>
                  <div className="space-y-4">
                    <InfoRow label="Serial Number" value="1234567890" />
                    <InfoRow label="Purchased From" value="Best Buy" />
                    <InfoRow label="Last Updated" value="Today, 2:30 PM" />
                  </div>
                </section>
              </div>
            )}
            {activeTab === 'attachments' && (
              <div className="text-[#64748B] text-center py-12">
                Attachments content...
              </div>
            )}
            {activeTab === 'activity' && (
              <div className="text-[#64748B] text-center py-12">
                Activity content...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</span>
      <div>{children}</div>
    </div>
  )
}

function TabButton({ active, onClick, label, count }: { active: boolean, onClick: () => void, label: string, count?: number }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-4 text-sm font-semibold transition-all relative inline-flex items-center gap-2",
        active ? "text-primary" : "text-[#64748B] hover:text-[#0F172A]"
      )}
    >
      {label}
      {count !== undefined && (
        <span className={cn(
          "px-1.5 py-0.5 rounded-full text-[10px] leading-none font-bold",
          active ? "bg-primary/10 text-primary" : "bg-[#F1F5F9] text-[#64748B]"
        )}>
          {count}
        </span>
      )}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
      )}
    </button>
  )
}

function InfoRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[#F1F5F9] last:border-0">
      <span className="text-sm text-[#64748B]">{label}</span>
      <span className="text-sm font-semibold text-[#0F172A]">{value}</span>
    </div>
  )
}