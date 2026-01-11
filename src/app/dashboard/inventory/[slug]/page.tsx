"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { inventoryApi } from "@/lib/inventory-api";
import {
  Calendar,
  MapPin,
  ChevronRight,
  Pencil,
  Paperclip,
  Trash2,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { InventoryItem } from "@/types/inventory";
import DeleteItemModal from "@/components/inventory/delete-item-modal";
import EditItemDrawer from "@/components/inventory/edit-item-drawer";

export default function InventoryDetailsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const itemId = params.slug as string;

  const [activeTab, setActiveTab] = useState("details");

  const {
    data: item,
    isLoading,
    error,
  } = useQuery<InventoryItem, Error>({
    queryKey: ["inventory", itemId],
    queryFn: () => inventoryApi.getItem(itemId),
    enabled: !!itemId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-full">
        <p className="font-medium text-red-500">
          {(error as Error)?.message || "Item not found"}
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  // Helper to format currency
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Helper to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const isWarrantyActive = () => {
    if (!item.warrantyExpires) return false;
    return new Date(item.warrantyExpires) > new Date();
  };

  const primaryImage =
    item.attachments?.find((a) => a.primary) || item.attachments?.[0];
  const otherImages =
    item.attachments?.filter((a) => a.id !== primaryImage?.id) || [];

  return (
    <div className="flex flex-col bg-bg-main h-full overflow-auto">
      {/* Top Header / Breadcrumbs */}
      <div className="flex justify-between items-center bg-white px-8 py-4 border-[#E2E8F0] border-b">
        <div className="flex items-center gap-2 font-medium text-[#64748B] text-sm">
          <span
            className="hover:text-[#0F172A] cursor-pointer"
            onClick={() => router.push("/dashboard/inventory")}
          >
            Inventory
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#0F172A] capitalize">{item.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            leftIcon={<Pencil className="w-4 h-4" />}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            leftIcon={<Paperclip className="w-4 h-4" />}
          >
            Add Attachment
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-red-50 border-red-100 font-semibold text-red-600 hover:text-red-700"
            leftIcon={<Trash2 className="w-4 h-4" />}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-8 p-8">
        {/* Title and Badges */}
        <div className="space-y-3">
          <h1 className="font-bold text-[#0F172A] text-3xl capitalize">
            {item.name}
          </h1>
          <div className="flex items-center gap-2">
            {item.labels?.map((label) => (
              <Badge
                key={label.id}
                variant="info"
                style={{
                  backgroundColor: label.color ? `${label.color}20` : undefined,
                  color: label.color,
                }}
              >
                {label.name}
              </Badge>
            ))}
            {isWarrantyActive() && (
              <Badge variant="teal">Active Warranty</Badge>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="space-y-6 bg-white shadow-sm p-6 border border-[#E2E8F0] rounded-2xl">
            <div className="flex justify-center items-center bg-slate-100 border border-[#E2E8F0] rounded-2xl aspect-4/3 overflow-hidden">
              {primaryImage ? (
                <img
                  src={primaryImage.path}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex justify-center items-center text-slate-400">
                  No Image
                </div>
              )}
            </div>
            <div className="gap-4 grid grid-cols-4">
              {otherImages.slice(0, 3).map((att) => (
                <div
                  key={att.id}
                  className="flex justify-center items-center bg-[#F1F5F9] border border-[#E2E8F0] hover:border-primary rounded-xl aspect-square overflow-hidden transition-all cursor-pointer"
                >
                  <img
                    src={att.thumbnail?.path || att.path}
                    alt="Attachment"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <button className="flex justify-center items-center bg-white hover:bg-primary/5 border border-[#CBD5E1] hover:border-primary border-dashed rounded-xl aspect-square text-[#94A3B8] hover:text-primary transition-all">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right: Key Details Card */}
          <div className="space-y-6 bg-white shadow-sm p-6 border border-[#E2E8F0] rounded-2xl">
            <h3 className="font-bold text-[#0F172A] text-lg">Key Details</h3>

            <div className="gap-6 grid grid-cols-1">
              <DetailItem label="Location">
                <div className="flex items-center gap-2 font-medium text-[#475569]">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{item.location?.name || "Unassigned"}</span>
                </div>
              </DetailItem>

              {item.labels && item.labels.length > 0 && (
                <DetailItem label="Labels">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.labels.map((label) => (
                      <Badge
                        key={label.id}
                        variant="info"
                        style={{
                          backgroundColor: label.color
                            ? `${label.color}20`
                            : undefined,
                          color: label.color,
                        }}
                      >
                        {label.name}
                      </Badge>
                    ))}
                  </div>
                </DetailItem>
              )}

              <DetailItem label="Quantity">
                <span className="font-semibold text-[#0F172A] text-lg">
                  {item.quantity || 0}
                </span>
              </DetailItem>

              <DetailItem label="Purchase Date">
                <div className="flex items-center gap-2 font-medium text-[#475569]">
                  <Calendar className="w-4 h-4 text-[#64748B]" />
                  <span>{formatDate(item.purchaseTime)}</span>
                </div>
              </DetailItem>

              <DetailItem label="Purchase Price">
                <span className="font-bold text-[#0F172A] text-2xl">
                  {formatCurrency(item.purchasePrice)}
                </span>
              </DetailItem>

              {item.warrantyExpires && (
                <DetailItem label="Warranty">
                  <Badge variant={isWarrantyActive() ? "teal" : "warning"}>
                    {isWarrantyActive()
                      ? `Active until ${formatDate(item.warrantyExpires)}`
                      : `Expired on ${formatDate(item.warrantyExpires)}`}
                  </Badge>
                </DetailItem>
              )}

              <DetailItem label="Notes">
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {item.notes}
                </p>
              </DetailItem>
            </div>
          </div>
        </div>

        {/* Tabs and Tab Content */}
        <div className="bg-white shadow-sm border border-[#E2E8F0] rounded-2xl overflow-hidden">
          <div className="flex items-center bg-white border-[#E2E8F0] border-b">
            <TabButton
              active={activeTab === "details"}
              onClick={() => setActiveTab("details")}
              label="Details"
            />
            <TabButton
              active={activeTab === "attachments"}
              onClick={() => setActiveTab("attachments")}
              label="Attachments"
              count={item.attachments?.length || 0}
            />
            <TabButton
              active={activeTab === "activity"}
              onClick={() => setActiveTab("activity")}
              label="Activity"
            />
          </div>

          <div className="p-8">
            {activeTab === "details" && (
              <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
                <section className="space-y-6">
                  <h4 className="font-bold text-[#94A3B8] text-sm uppercase tracking-wider">
                    Product Information
                  </h4>
                  <div className="space-y-4">
                    <InfoRow
                      label="Brand / Manufacturer"
                      value={item.manufacturer || "N/A"}
                    />
                    <InfoRow label="Model" value={item.modelNumber || "N/A"} />
                    {/* Render Custom Fields if any */}
                    {item.fields?.map((field) => (
                      <InfoRow
                        key={field.id}
                        label={field.name}
                        value={
                          field.textValue ||
                          field.numberValue?.toString() ||
                          (field.booleanValue ? "Yes" : "No") ||
                          "N/A"
                        }
                      />
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <h4 className="font-bold text-[#94A3B8] text-sm uppercase tracking-wider">
                    Additional Details
                  </h4>
                  <div className="space-y-4">
                    <InfoRow
                      label="Serial Number"
                      value={item.serialNumber || "N/A"}
                    />
                    <InfoRow
                      label="Purchased From"
                      value={item.purchaseFrom || "N/A"}
                    />
                    <InfoRow
                      label="Last Updated"
                      value={
                        item.updatedAt
                          ? format(new Date(item.updatedAt), "PP p")
                          : "N/A"
                      }
                    />
                  </div>
                </section>
              </div>
            )}
            {activeTab === "attachments" && (
              <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {item.attachments?.map((att) => (
                  <div
                    key={att.id}
                    className="group relative border rounded-lg aspect-square overflow-hidden"
                  >
                    <img
                      src={att.thumbnail?.path || att.path}
                      alt="Attachment"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 text-white text-xs transition-opacity">
                      {att.mimeType}
                    </div>
                  </div>
                ))}
                {(!item.attachments || item.attachments.length === 0) && (
                  <div className="col-span-full py-12 text-[#64748B] text-center">
                    No attachments found.
                  </div>
                )}
              </div>
            )}
            {activeTab === "activity" && (
              <div className="py-12 text-[#64748B] text-center">
                Activity logs coming soon...
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteItemModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          router.push("/dashboard/inventory");
        }}
        item={item}
      />
      <EditItemDrawer
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        item={item}
      />
    </div>
  );
}

function DetailItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <span className="font-semibold text-[#94A3B8] text-xs uppercase tracking-wider">
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex relative items-center gap-2 px-6 py-4 font-semibold text-sm transition-all",
        active ? "text-primary" : "text-[#64748B] hover:text-[#0F172A]",
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "px-1.5 py-0.5 rounded-full font-bold text-[10px] leading-none",
            active
              ? "bg-primary/10 text-primary"
              : "bg-[#F1F5F9] text-[#64748B]",
          )}
        >
          {count}
        </span>
      )}
      {active && (
        <div className="right-0 bottom-0 left-0 absolute bg-primary h-0.5" />
      )}
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-[#F1F5F9] last:border-0 border-b">
      <span className="text-[#64748B] text-sm">{label}</span>
      <span className="font-semibold text-[#0F172A] text-sm">{value}</span>
    </div>
  );
}
