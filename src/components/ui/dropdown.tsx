"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = React.createContext<DropdownContextValue | undefined>(
  undefined,
);

export function useDropdown() {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a Dropdown");
  }
  return context;
}

interface DropdownProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Dropdown({
  children,
  defaultOpen = false,
  onOpenChange,
  className,
}: DropdownProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const toggle = React.useCallback(() => setOpen((prev) => !prev), []);
  const close = React.useCallback(() => setOpen(false), []);

  const value = React.useMemo(
    () => ({ open, setOpen, toggle, close }),
    [open, toggle, close],
  );

  return (
    <DropdownContext.Provider value={value}>
      <div className={cn("inline-block relative text-left", className)}>
        {children}
        {open && (
          <div
            className="z-40 fixed inset-0 bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          />
        )}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ className, children, onClick, ...props }, ref) => {
  const { toggle, open } = useDropdown();

  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        toggle();
        onClick?.(e);
      }}
      aria-expanded={open}
      aria-haspopup="true"
      type="button"
      className={cn(
        "inline-flex z-10 relative justify-center w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownTrigger.displayName = "DropdownTrigger";

interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right";
}

export const DropdownContent = React.forwardRef<
  HTMLDivElement,
  DropdownContentProps
>(({ className, children, align = "right", ...props }, ref) => {
  const { open } = useDropdown();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => dropdownRef.current!);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "z-50 absolute bg-white ring-opacity-5 shadow-lg mt-2 rounded-md focus:outline-none ring-1 ring-gray-300 w-56",
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        align === "right"
          ? "right-0 origin-top-right"
          : "left-0 origin-top-left",
        className,
      )}
      onMouseDown={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      role="menu"
      aria-orientation="vertical"
      tabIndex={-1}
      {...props}
    >
      <div className="py-1" role="none">
        {children}
      </div>
    </div>
  );
});
DropdownContent.displayName = "DropdownContent";

interface DropdownItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "danger";
  icon?: React.ReactNode;
}

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(
  (
    { className, children, onClick, variant = "default", icon, ...props },
    ref,
  ) => {
    const { close } = useDropdown();

    return (
      <button
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
          close();
        }}
        className={cn(
          "group flex items-center px-4 py-2 w-full text-sm",
          variant === "danger"
            ? "text-red-700 hover:bg-red-50"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          className,
        )}
        role="menuitem"
        {...props}
      >
        {icon && (
          <span
            className={cn(
              "mr-3 w-5 h-5",
              variant === "danger"
                ? "text-red-500 group-hover:text-red-600"
                : "text-gray-400 group-hover:text-gray-500",
            )}
          >
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  },
);
DropdownItem.displayName = "DropdownItem";
