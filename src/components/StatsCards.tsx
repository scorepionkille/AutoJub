"use client";

interface StatsCardsProps {
  total: number;
  percentage: number;
  pending: number;
}

export default function StatsCards({ total, percentage, pending }: StatsCardsProps) {
  const stats = [
    {
      label: "งานทั้งหมด",
      value: total.toString(),
      bg: "bg-info-50 dark:bg-info-500/15",
      text: "text-info-500",
      border: "border-info-100 dark:border-info-500/20",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: "เสร็จแล้ว",
      value: `${percentage}%`,
      bg: "bg-primary-50 dark:bg-primary-900/30",
      text: "text-primary-600 dark:text-primary-400",
      border: "border-primary-100 dark:border-primary-800/40",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "ค้างอยู่",
      value: pending.toString(),
      bg: "bg-danger-50 dark:bg-danger-500/10",
      text: "text-danger-400 dark:text-danger-300",
      border: "border-danger-100 dark:border-danger-500/15",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`${s.bg} border ${s.border} rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-200`}
        >
          <div className={`${s.text}`}>{s.icon}</div>
          <div>
            <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-300 mt-0.5">
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
