"use client";
import Image from "next/image";
import { ChevronRight, Loader2 } from "lucide-react";
import InventoryActions from "./inventory-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge, BadgeVariant } from "./ui/badge";
import Pagination from "./ui/pagination";
import { InventoryItem, Label } from "@/types/inventory";
import { useRouter } from "next/navigation";

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
  onPageChange,
}: InventoryTableProps) {
  const router = useRouter();
  const getBadgeVariant = (label: Label | string): BadgeVariant => {
    const name = typeof label === "string" ? label : label.name;
    const l = name.toLowerCase();
    if (l.includes("tools") || l.includes("power")) return "info";
    if (l.includes("warranty")) return "success";
    if (l.includes("electronics")) return "purple";
    if (l.includes("appliances")) return "warning";
    if (l.includes("outdoor")) return "teal";
    if (l.includes("seasonal")) return "yellow";
    if (l.includes("high value")) return "pink";
    return "default";
  };

  const formatLocation = (location: InventoryItem["location"]) => {
    if (!location) return <span className="text-[#64748B] text-sm">-</span>;
    // Location is object: { name, ... }
    const parts = location.name ? location.name.split(" > ") : [];
    if (parts.length <= 1)
      return <span className="text-[#64748B] text-sm">{location.name}</span>;
    return (
      <div className="flex items-center gap-1.5 text-[#64748B] text-sm">
        <span>{parts[0]}</span>
        <ChevronRight className="opacity-50 w-3.5 h-3.5" />
        <span>{parts[1]}</span>
      </div>
    );
  };

  const formatRelativeTime = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const diffDays = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex flex-1 mt-10 px-6 overflow-auto">
        <Table containerClassName="flex-1 bg-white border border-[#F1F5F9] rounded-lg">
          <TableHeader className="top-0 z-10 sticky bg-slate-100 hover:bg-slate-100">
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="border-slate-300 rounded accent-blue-600 cursor-pointer"
                />
              </TableHead>
              <TableHead className="min-w-[200px]">Item</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Labels</TableHead>
              <TableHead className="pr-8 text-right">Quantity</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
                    <span className="text-slate-500">Loading inventory...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-slate-500 text-center"
                >
                  No items found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={(e) => {
                    router.push(`/dashboard/inventory/${item.id}`);
                  }}
                  className="group transition-colors"
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      className="border-slate-300 rounded accent-blue-600 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4 py-1">
                      <div className="relative bg-slate-50 border border-slate-100 rounded-lg w-12 h-12 overflow-hidden shrink-0">
                        <Image
                          src={"/product-placeholder.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="max-w-[200px] font-bold text-[#1E293B] truncate leading-snug">
                          {item.name}
                        </span>
                        {item.description && (
                          <span className="text-[#64748B] text-[11px]">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatLocation(item.location)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-2 max-w-[250px]">
                      {item.labels &&
                        item.labels.map((label, idx) => (
                          <Badge
                            key={label.id || idx}
                            variant={getBadgeVariant(label)}
                          >
                            {label.name}
                          </Badge>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <span className="font-bold text-[#0F172A]">
                      {item.quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[#64748B] text-sm">
                      {formatRelativeTime(item.updatedAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <InventoryActions item={item} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="bg-white border-[#F1F5F9] border-t shrink-0">
        <Pagination
          totalItems={total}
          itemsPerPage={pageSize}
          currentPage={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
