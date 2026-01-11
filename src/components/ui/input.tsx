import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    endIcon?: React.ReactNode
}

export default function Input({endIcon, className = "", ...props}: InputProps) {
  return (
    <div className='relative w-full group'>
      <input 
        className={`w-full border border-[#D1D5DB] bg-[#F9FAFB] rounded-lg px-4 py-3 text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${endIcon ? 'pr-10' : ''} ${className}`}
        {...props} 
      />
      {endIcon && (
        <div className='absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none group-focus-within:text-primary transition-colors'>
          {endIcon}
        </div>
      )}
    </div>
  )
}
