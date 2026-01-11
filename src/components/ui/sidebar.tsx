"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  MapPin,
  Tag,
  BarChart2,
  Settings,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navItems = [
  { name: "Inventory", href: "/dashboard/inventory", icon: Package },
  { name: "Locations", href: "/dashboard/locations", icon: MapPin },
  { name: "Labels", href: "/dashboard/labels", icon: Tag },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-white border-r border-[#F1F5F9] flex flex-col h-screen transition-all duration-300 ease-in-out relative shrink-0",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo/Brand */}
      <div className={cn("p-6 pb-2", isCollapsed && "px-2 py-6")}>
        <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-[17px] font-bold text-[#0F172A] leading-tight">Home Inventory</span>
              <span className="text-[13px] text-[#64748B] font-medium">Manage your items</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.name === "Inventory" && pathname.startsWith("/dashboard/inventory"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-slate-500 hover:bg-bg-main hover:text-slate-900",
                isCollapsed && "justify-center px-0 h-12 w-12 mx-auto"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-slate-400")} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>

      <div className="px-4 py-4 space-y-4">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-semibold text-[#64748B] hover:bg-bg-main hover:text-[#0F172A] transition-all duration-200",
            isCollapsed && "justify-center px-0 h-12 w-12 mx-auto"
          )}
        >
          <Settings className="h-5 w-5 shrink-0 text-[#94A3B8]" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        <div className="h-px bg-[#F1F5F9] -mx-4" />
        {/* User Profile */}
        <div className={cn("flex items-center justify-between", isCollapsed && "justify-center")}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-100 overflow-hidden shrink-0 border border-[#F1F5F9]">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
                alt="User" 
                className="h-full w-full object-cover"
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-bold text-[#0F172A] truncate">John Smith</span>
                <span className="text-[12px] text-[#64748B] font-medium truncate">john@example.com</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94A3B8]">
              <MoreVertical className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
