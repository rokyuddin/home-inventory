import { Bell, HelpCircle } from "lucide-react";
import { LocationsContent } from "./_components/locations-content";

export default function LocationsPage() {
  return (
    <div className="flex flex-col bg-slate-50 h-full">
      {/* Header */}
      <header className="flex justify-between items-center bg-white px-8 py-4 border-slate-200 border-b shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-slate-900 text-xl">Locations</h1>
          <span className="font-medium text-slate-500 text-sm">
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
