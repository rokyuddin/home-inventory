"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  /** The current active page (1-indexed) */
  currentPage: number;
  /** Total number of items across all pages */
  totalItems: number;
  /** Number of items displayed per page */
  itemsPerPage: number;
  /** Callback function triggered when the page changes */
  onPageChange: (page: number) => void;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Pagination component for navigating through paged data.
 * Displays "Showing X-Y of Z items" and page number controls.
 */
export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // If there are no items or only one page, we might still want to show the status
  // or hide the pagination. For consistency with the UI, we'll show it but
  // disable navigation if totalPages <= 1.

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = getVisiblePages(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 px-4 py-3",
        className,
      )}
    >
      {/* Items Status */}
      <div className="text-sm text-[#64748B]">
        Showing{" "}
        <span className="font-semibold text-[#0F172A]">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="font-semibold text-[#0F172A]">{totalItems}</span>{" "}
        items
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className="h-10 w-10 p-0"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <div
                key={`ellipsis-${index}`}
                className="flex h-10 w-10 items-center justify-center text-[#94A3B8]"
              >
                <MoreHorizontal className="h-4 w-4" />
              </div>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <Button
              key={page}
              variant={isCurrent ? "primary" : "outline"}
              onClick={() => handlePageChange(page)}
              className={cn(
                "h-10 w-10 p-0 text-sm font-bold",
                isCurrent && "shadow-blue-200",
              )}
              aria-current={isCurrent ? "page" : undefined}
            >
              {page}
            </Button>
          );
        })}

        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="h-10 w-10 p-0"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/**
 * Helper to determine which page numbers should be visible with ellipsis.
 */
function getVisiblePages(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];

  if (current <= 3) {
    // Near the start: 1, 2, 3, 4, ..., total
    for (let i = 1; i <= 4; i++) pages.push(i);
    pages.push("ellipsis");
    pages.push(total);
  } else if (current >= total - 2) {
    // Near the end: 1, ..., total-3, total-2, total-1, total
    pages.push(1);
    pages.push("ellipsis");
    for (let i = total - 3; i <= total; i++) pages.push(i);
  } else {
    // In the middle: 1, ..., current-1, current, current+1, ..., total
    pages.push(1);
    pages.push("ellipsis");
    pages.push(current - 1);
    pages.push(current);
    pages.push(current + 1);
    pages.push("ellipsis");
    pages.push(total);
  }

  return pages;
}
