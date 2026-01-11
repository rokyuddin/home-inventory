"use client";

import { 
  Search, 
  Plus, 
  MapPin, 
  Home, 
  Warehouse, 
  Archive, 
  ChevronRight, 
  MoreVertical, 
  Edit2, 
  UserPlus, 
  Trash2,
  Bell,
  HelpCircle,
  BookOpen,
  Camera,
  Layers,
  Image as ImageIcon,
  Library
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

const locations = [
  {
    id: "home",
    name: "Home",
    icon: Home,
    count: 12,
    color: "text-blue-500",
    children: [
      { id: "garage", name: "Garage", icon: Warehouse, count: 8, color: "text-slate-500" },
      { id: "storage", name: "Storage Unit", icon: Archive, count: 15, color: "text-orange-500" },
    ],
  },
];

const items = [
  {
    id: 1,
    name: "Vintage Camera Collection",
    category: "Electronics",
    addedDate: "Added 2 weeks ago",
    price: "$180",
    status: "Good",
    icon: ImageIcon,
  },
  {
    id: 2,
    name: "Book Collection",
    category: "Books",
    addedDate: "Added 1 month ago",
    price: "$65",
    status: "Good",
    icon: ImageIcon,
  },
];

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState("Bookshelf");

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <header className="bg-white px-8 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-slate-900">Locations</h1>
          <span className="text-sm text-slate-500 font-medium">Organize your items by location</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-slate-600">
            <Bell className="size-5" />
          </button>
          <button className="text-slate-400 hover:text-slate-600">
            <HelpCircle className="size-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col p-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input 
              placeholder="Search locations..." 
              className="pl-10 bg-slate-50 border-slate-200"
            />
          </div>
          
          <Button 
            variant="primary" 
            size="lg" 
            leftIcon={<Plus className="size-5" />}
          >
            New Location
          </Button>

          <div className="mt-2 space-y-1">
            {locations.map((loc) => (
              <div key={loc.id} className="space-y-1">
                <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <ChevronRight className="size-4 text-slate-400" />
                    <loc.icon className={cn("size-5", loc.color)} />
                    <span className="text-[15px] font-semibold text-slate-700">{loc.name}</span>
                  </div>
                  <Badge className="bg-slate-100 text-slate-500 font-medium rounded-full px-2">
                    {loc.count}
                  </Badge>
                </div>
                
                {loc.children && (
                  <div className="ml-8 space-y-1">
                    {loc.children.map((child) => (
                      <div key={child.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <child.icon className={cn("size-5", child.color)} />
                          <span className="text-[15px] font-semibold text-slate-700">{child.name}</span>
                        </div>
                        <Badge className="bg-slate-100 text-slate-500 font-medium rounded-full px-2">
                          {child.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Detail Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Location Detail Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="size-14 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Library className="size-7 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedLocation}</h2>
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mt-1">
                    <Home className="size-4" />
                    <span>Home</span>
                    <ChevronRight className="size-3" />
                    <span>Living Room</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2 border-slate-200 text-slate-600"
                  leftIcon={<Edit2 className="size-4" />}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 border-slate-200 text-primary bg-primary/10"
                  leftIcon={<Plus className="size-4" />}
                >
                  Add Child
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 border-slate-200 text-red-500 bg-red-50/50 hover:bg-red-50"
                  leftIcon={<Trash2 className="size-4" />}
                >
                  Delete
                </Button>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
              <p className="text-slate-600 text-[15px] leading-relaxed max-w-2xl">
                White wooden bookshelf in the living room contenant books, decorations, and collectibles. Located next to the window.
              </p>
            </div>

            <div className="grid grid-cols-3 pt-6 border-t border-slate-100">
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Items</h4>
                <p className="text-2xl font-bold text-slate-900">2</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Value</h4>
                <p className="text-2xl font-bold text-slate-900">$245</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Created</h4>
                <p className="text-[15px] font-semibold text-slate-500 mt-2">Jan 15, 2024</p>
              </div>
            </div>
          </div>

          {/* Items in Location Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Items in this Location</h3>
              <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                View All <ChevronRight className="size-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <item.icon className="size-6 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <p className="text-sm text-slate-500 font-medium">
                        {item.category} • {item.addedDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{item.price}</p>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none shadow-none mt-1 hover:bg-emerald-50">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}

              <button className="w-full flex items-center justify-center gap-2 py-4 text-blue-600 font-bold hover:bg-blue-50/50 rounded-xl transition-colors mt-2">
                <Plus className="size-5" />
                Add Item to this Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
