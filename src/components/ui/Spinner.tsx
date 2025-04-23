// src/components/ui/Spinner.tsx
interface SpinnerProps {
  /** Tailwind の h-? w-? クラス用サイズ (例: 8 → h-8 w-8) */
  sizeClass?: string;
  /** Tailwind の border 色クラス */
  colorClass?: string;
}

export default function Spinner({
  sizeClass = "h-8 w-8",
  colorClass = "border-blue-600",
}: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          animate-spin
          rounded-full
          ${sizeClass}
          border-4
          ${colorClass}
          border-t-transparent
        `}
      />
    </div>
  );
}
