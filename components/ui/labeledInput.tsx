// components/ui/labeledInput.tsx

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Added new props for functionality and error handling
interface LabledInputProps {
  label: string;
  name: string; // Crucial for Server Actions
  type: string;
  placeholder: string;
  autoComplete?: string;
  className?: string;
  error?: string; // Prop to pass the error message
}

export function LabledInput({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  className,
  error,
}: LabledInputProps) {
  const id = name; // Use name for a consistent ID

  return (
    <div
      className={`grid items-center gap-1.5 w-[75vw] sm:w-[40vw] ${className}`}
    >
      <Label htmlFor={id} className="font-normal text-text-body">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="border-border border-2"
      />
      {/* This is the red text that appears when there's an error */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
