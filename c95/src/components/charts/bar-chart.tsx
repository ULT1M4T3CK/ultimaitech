"use client";

import { cn } from "@/lib/utils";

export type BarChartItem = {
  label: string;
  value: number;
  highlight?: boolean;
};

type Props = {
  data: BarChartItem[];
  max?: number;
  target?: number;
  className?: string;
};

export function BarChart({ data, max = 100, target, className }: Props) {
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative flex flex-1 items-end gap-2 pb-8 pl-10 pt-4">
        {gridLines.map((v) => (
          <div
            key={v}
            className="pointer-events-none absolute left-10 right-0 border-t border-dashed border-border/60"
            style={{ bottom: `${((v / max) * 100) * 0.7 + 12}%` }}
          >
            <span className="absolute -left-10 -top-2.5 text-[11px] text-muted-foreground">
              {v}%
            </span>
          </div>
        ))}

        {target != null && (
          <div
            className="pointer-events-none absolute left-10 right-0 border-t-2 border-dashed border-primary/50"
            style={{ bottom: `${((target / max) * 100) * 0.7 + 12}%` }}
          >
            <span className="absolute right-0 -top-4 text-[10px] font-medium text-primary">
              Doel: {target}%
            </span>
          </div>
        )}

        <div className="flex flex-1 items-end justify-around gap-1">
          {data.map((item, i) => {
            const height = Math.max(2, (item.value / max) * 70);
            return (
              <div key={i} className="flex flex-col items-center gap-1" style={{ flex: 1 }}>
                <div
                  className={cn(
                    "w-full max-w-[3rem] rounded-t-md transition-all",
                    item.highlight
                      ? "bg-primary shadow-sm"
                      : "bg-primary/30",
                  )}
                  style={{ height: `${height}%`, minHeight: "4px" }}
                />
                <span
                  className={cn(
                    "mt-1 text-[11px] leading-tight",
                    item.highlight ? "font-semibold text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
