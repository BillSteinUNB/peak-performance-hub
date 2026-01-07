import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#FF4D00] hover:bg-[#E64500] text-white focus:ring-[#FF4D00] shadow-[0_0_20px_rgba(255,77,0,0.3)] hover:shadow-[0_0_30px_rgba(255,77,0,0.5)] border border-transparent",
    secondary: "bg-[#00D4AA] hover:bg-[#00BFA0] text-black focus:ring-[#00D4AA] shadow-[0_0_20px_rgba(0,212,170,0.3)] border border-transparent",
    outline: "bg-transparent border border-[#404040] text-white hover:border-[#FF4D00] hover:text-[#FF4D00]",
    ghost: "bg-transparent text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A]",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs rounded-sm",
    md: "h-12 px-6 text-sm rounded-md",
    lg: "h-14 px-8 text-base rounded-md",
    icon: "h-10 w-10 p-2 rounded-full",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};