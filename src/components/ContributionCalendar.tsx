"use client";

import { useMemo, useState } from "react";
import { DayData } from "@/lib/types";

interface ContributionCalendarProps {
  data: DayData[];
  onSelectDate: (date: string) => void;
  selectedDate: string;
}

const CELL_SIZE = 14;
const CELL_GAP = 3;
const ROWS = 7; // days of week

const levelColors = [
  "bg-primary-50 dark:bg-primary-900/20 hover:ring-2 hover:ring-primary-200",
  "bg-primary-200 dark:bg-primary-700/50 hover:ring-2 hover:ring-primary-300",
  "bg-primary-400 dark:bg-primary-500/80 hover:ring-2 hover:ring-primary-400",
  "bg-primary-500 dark:bg-primary-400 hover:ring-2 hover:ring-primary-500",
  "bg-primary-700 dark:bg-primary-300 hover:ring-2 hover:ring-primary-600",
];

const dayLabels = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
const monthNames = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

export default function ContributionCalendar({
  data,
  onSelectDate,
  selectedDate,
}: ContributionCalendarProps) {
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const { grid, monthLabels, weeks } = useMemo(() => {
    if (data.length === 0) return { grid: [], monthLabels: [], weeks: 0 };

    // Build grid: columns = weeks, rows = days (Mon-Sun)
    const firstDate = new Date(data[0].date);
    const lastDate = new Date(data[data.length - 1].date);

    // Adjust to start on Monday
    const startDay = firstDate.getDay();
    const adjustedStart = new Date(firstDate);
    const mondayOffset = startDay === 0 ? -6 : 1 - startDay;
    adjustedStart.setDate(adjustedStart.getDate() + mondayOffset);

    const dataMap = new Map(data.map((d) => [d.date, d]));

    const cells: (DayData | null)[][] = [];
    const labels: { month: string; col: number }[] = [];
    let currentDate = new Date(adjustedStart);
    let col = 0;
    let lastMonth = -1;

    while (currentDate <= lastDate) {
      const week: (DayData | null)[] = [];
      for (let row = 0; row < ROWS; row++) {
        const dateStr = currentDate.toISOString().split("T")[0];
        const entry = dataMap.get(dateStr) || null;

        if (currentDate > lastDate || currentDate < firstDate) {
          week.push(null);
        } else {
          week.push(entry || { date: dateStr, taskCount: 0, completedCount: 0, level: 0 });
        }

        // Track month labels
        const m = currentDate.getMonth();
        if (m !== lastMonth && row === 0) {
          labels.push({ month: monthNames[m], col });
          lastMonth = m;
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
      cells.push(week);
      col++;
    }

    return { grid: cells, monthLabels: labels, weeks: cells.length };
  }, [data]);

  return (
    <div className="bg-white dark:bg-surface-dark-secondary rounded-2xl border border-neutral-200/60 dark:border-neutral-600/30 p-6">
      <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-200 mb-1">
        ปฏิทินบันทึกงาน
      </h3>
      <p className="text-xs text-neutral-300 dark:text-neutral-500 mb-4">
        GitHub-style • กดวันเพื่อดูรายละเอียด
      </p>

      <div className="overflow-x-auto pb-2">
        <div className="relative" style={{ minWidth: weeks * (CELL_SIZE + CELL_GAP) + 40 }}>
          {/* Month labels */}
          <div className="flex ml-8 mb-1">
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="text-[10px] text-neutral-300 dark:text-neutral-500"
                style={{
                  position: "absolute",
                  left: m.col * (CELL_SIZE + CELL_GAP) + 32,
                }}
              >
                {m.month}
              </div>
            ))}
          </div>

          <div className="flex gap-0 mt-5">
            {/* Day labels */}
            <div className="flex flex-col shrink-0 mr-2" style={{ gap: CELL_GAP }}>
              {dayLabels.map((d, i) => (
                <div
                  key={i}
                  className="text-[10px] text-neutral-300 dark:text-neutral-500 flex items-center justify-end"
                  style={{ height: CELL_SIZE, width: 24 }}
                >
                  {i % 2 === 0 ? d : ""}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex" style={{ gap: CELL_GAP }}>
              {grid.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: CELL_GAP }}>
                  {week.map((day, di) => {
                    if (!day)
                      return (
                        <div
                          key={di}
                          style={{ width: CELL_SIZE, height: CELL_SIZE }}
                        />
                      );

                    const isSelected = day.date === selectedDate;
                    return (
                      <div
                        key={di}
                        className={`rounded-sm cursor-pointer transition-all duration-150 ${
                          levelColors[day.level]
                        } ${
                          isSelected
                            ? "ring-2 ring-primary-500 ring-offset-1 dark:ring-offset-surface-dark-secondary scale-125 z-10"
                            : ""
                        }`}
                        style={{ width: CELL_SIZE, height: CELL_SIZE }}
                        onClick={() => onSelectDate(day.date)}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            text: `${new Date(day.date).toLocaleDateString("th-TH", {
                              day: "numeric",
                              month: "short",
                            })} — ${day.taskCount} งาน (${day.completedCount} เสร็จ)`,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 8,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-[10px] text-neutral-300 dark:text-neutral-500">
        <span>ว่าง</span>
        {levelColors.map((c, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${c.split(" ")[0]} ${c.split(" ")[1]}`} />
        ))}
        <span>เต็ม</span>
      </div>

      {/* Tooltip (portal would be ideal but keeping simple) */}
      {tooltip && (
        <div
          className="fixed z-50 px-3 py-1.5 bg-neutral-700 dark:bg-neutral-200 text-white dark:text-neutral-700 text-xs rounded-lg shadow-lg pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
