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
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { name: "Inventory", href: "/dashboard/inventory", icon: Package },
  { name: "Locations", href: "/dashboard/locations", icon: MapPin },
  { name: "Labels", href: "/dashboard/labels", icon: Tag },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart2 },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden z-40 fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "z-50 relative flex flex-col bg-white border-[#F1F5F9] border-r h-screen transition-all duration-300 ease-in-out shrink-0",
          "fixed inset-y-0 left-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "w-20" : "w-72",
        )}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-8 z-50 items-center justify-center w-6 h-6 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          )}
        </button>
        <div className="lg:block flex justify-between items-center">
          {/* Logo/Brand */}
          <div className={cn("p-6 pb-2", isCollapsed && "px-2 py-6")}>
            <div
              className={cn(
                "flex items-center gap-2",
                isCollapsed && "justify-center",
              )}
            >
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-bold text-[#0F172A] text-[17px] leading-tight">
                    Home Inventory
                  </span>
                  <span className="font-medium text-[#64748B] text-[13px]">
                    Manage your items
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-4"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-1 space-y-1 mt-6 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.name === "Inventory" &&
                pathname.startsWith("/dashboard/inventory"));

            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-[15px] transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-500 hover:bg-bg-main hover:text-slate-900",
                    isCollapsed && "justify-center px-0 h-12 w-12 mx-auto",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 shrink-0",
                      isActive ? "text-primary" : "text-slate-400",
                    )}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
                {/* Tooltip - only visible when collapsed */}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none shadow-lg">
                    {item.name}
                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-4 px-4 py-4">
          <div className="relative group">
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex items-center gap-3 hover:bg-bg-main px-3 py-2.5 rounded-xl font-semibold text-[#64748B] text-[15px] hover:text-[#0F172A] transition-all duration-200",
                isCollapsed && "justify-center px-0 h-12 w-12 mx-auto",
              )}
            >
              <Settings className="w-5 h-5 text-[#94A3B8] shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
            {/* Tooltip - only visible when collapsed */}
            {isCollapsed && (
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none shadow-lg">
                Settings
                <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
              </span>
            )}
          </div>

          {/* Sign Out */}
          <div className="relative group">
            <button
              onClick={logout}
              className={cn(
                "flex items-center gap-3 hover:bg-red-50 px-3 py-2.5 rounded-xl font-semibold text-[#64748B] text-[15px] hover:text-red-600 transition-all duration-200 w-full",
                isCollapsed && "justify-center px-0 h-12 w-12 mx-auto",
              )}
            >
              <LogOut className="w-5 h-5 text-[#94A3B8] shrink-0" />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
            {/* Tooltip - only visible when collapsed */}
            {isCollapsed && (
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none shadow-lg">
                Sign Out
                <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
              </span>
            )}
          </div>

          <div className="bg-[#F1F5F9] -mx-4 h-px" />
          {/* User Profile */}
          <div
            className={cn(
              "flex justify-between items-center",
              isCollapsed && "justify-center",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 border border-[#F1F5F9] rounded-full w-10 h-10 overflow-hidden shrink-0">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[#0F172A] text-[14px] truncate capitalize">
                    {user?.username.split("@")[0]}
                  </span>
                  <span className="font-medium text-[#64748B] text-[12px] truncate">
                    {user?.username}
                  </span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-[#94A3B8]"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
