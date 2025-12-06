import React from "react";
import { X } from "lucide-react";

// --- Glass Card ---
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => (
  <div
    className={`bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl p-6 ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)]",
    secondary:
      "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white",
    danger:
      "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Form Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  className = "",
  ...props
}) => (
  <div className="mb-4">
    {label && (
      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </label>
    )}
    <input
      className={`w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors ${className}`}
      {...props}
    />
  </div>
);

// --- Textarea ---
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  className = "",
  ...props
}) => (
  <div className="mb-4">
    {label && (
      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
        {label}
      </label>
    )}
    <textarea
      className={`w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors ${className}`}
      {...props}
    />
  </div>
);

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-lg bg-[#0f0f23] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{
  children: React.ReactNode;
  color?: "cyan" | "green" | "yellow" | "purple";
}> = ({ children, color = "cyan" }) => {
  const colors = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    purple: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}
    >
      {children}
    </span>
  );
};
