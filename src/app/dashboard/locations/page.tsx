import { LocationsContent } from "@/components/location/locations-content";
import { Bell, HelpCircle } from "lucide-react";

export default function LocationsPage() {
  return (
    <div className="flex flex-col bg-slate-50 h-full">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 bg-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-slate-200 border-b shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <h1 className="font-bold text-slate-900 text-lg sm:text-xl">Locations</h1>
          <span className="hidden sm:inline font-medium text-slate-500 text-sm">
            Organize your items by location
          </span>
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
      <LocationsContent />
    </div>
  );
}
