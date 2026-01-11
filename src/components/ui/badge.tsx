import { cn } from "@/lib/utils";
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'teal' | 'yellow' | 'pink';

export function Badge({children, variant = 'default', className = ""}: {children: React.ReactNode, variant?: BadgeVariant, className?: string}) {
  return (
   <span className={cn('px-2.5 py-0.5 rounded-full text-xs leading-5 font-semibold transition-colors', {
    'bg-primary/10 text-primary': variant === 'info',
    'bg-[#E6FCEA] text-[#26C688]': variant === 'success',
    'bg-[#FFF2E0] text-[#D97706]': variant === 'warning',
    'bg-[#FCE4E4] text-[#D92606]': variant === 'error',
    'bg-[#F5F3FF] text-[#8B5CF6]': variant === 'purple',
    'bg-[#F0FDFA] text-[#0D9488]': variant === 'teal',
    'bg-[#FEFCE8] text-[#CA8A04]': variant === 'yellow',
    'bg-[#FFF1F2] text-[#E11D48]': variant === 'pink',
    'bg-slate-100 text-slate-600': variant === 'default',
   }, className)}>{children}</span>
  )
}
