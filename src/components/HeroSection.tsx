"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-300/15 rounded-full blur-3xl animate-float stagger-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-100/30 to-transparent rounded-full" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-fade-in-up opacity-0">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          ระบบบันทึกงานรุ่นใหม่
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up opacity-0 stagger-1">
          <span className="text-neutral-700 dark:text-neutral-100">บันทึกงาน</span>
          <br />
          <span className="gradient-text">ทุกวัน ทุกโปรเจค</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-neutral-400 dark:text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up opacity-0 stagger-2">
          ระบบบันทึกงานประจำวันที่ช่วยให้ทีมของคุณติดตามผลงาน
          <br className="hidden md:block" />
          ด้วยปฏิทินแบบ GitHub-style ดูภาพรวมได้ในพริบตา
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up opacity-0 stagger-3">
          <Link
            href="/login"
            className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              เริ่มต้นใช้งานฟรี
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 text-neutral-500 dark:text-neutral-300 font-medium rounded-2xl border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 hover:border-neutral-300 transition-all duration-200"
          >
            ดูฟีเจอร์ทั้งหมด
          </Link>
        </div>

        {/* Preview card */}
        <div className="relative max-w-3xl mx-auto animate-fade-in-up opacity-0 stagger-4">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/20 via-accent-400/20 to-primary-400/20 rounded-3xl blur-2xl" />
          <div className="relative bg-white dark:bg-surface-dark-secondary rounded-2xl shadow-2xl shadow-black/10 border border-neutral-200/60 dark:border-neutral-600/30 overflow-hidden">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 dark:bg-surface-dark-tertiary border-b border-neutral-100 dark:border-neutral-600/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger-300/80" />
                <div className="w-3 h-3 rounded-full bg-warning-200/80" />
                <div className="w-3 h-3 rounded-full bg-primary-300/80" />
              </div>
              <div className="flex-1 mx-8">
                <div className="bg-neutral-200/50 dark:bg-neutral-600/30 rounded-lg px-3 py-1 text-xs text-neutral-400 text-center">
                  worklog.app/dashboard
                </div>
              </div>
            </div>
            {/* Preview content - mini calendar */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600" />
                <div>
                  <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-600 rounded" />
                  <div className="h-2 w-16 bg-neutral-100 dark:bg-neutral-700 rounded mt-1.5" />
                </div>
              </div>
              {/* Mini contribution graph */}
              <div className="grid grid-cols-20 gap-1 mb-4">
                {Array.from({ length: 100 }).map((_, i) => {
                  const colors = [
                    "bg-primary-50 dark:bg-primary-900/30",
                    "bg-primary-200 dark:bg-primary-700/50",
                    "bg-primary-400 dark:bg-primary-500",
                    "bg-primary-600 dark:bg-primary-400",
                  ];
                  // Use a deterministic pseudo-random value based on index
                  const rand = Math.abs(Math.sin(i * 1234.5678)) % 1;
                  const colorIdx =
                    rand < 0.35 ? 0 : rand < 0.55 ? 1 : rand < 0.8 ? 2 : 3;
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-sm ${colors[colorIdx]}`}
                    />
                  );
                })}
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-info-50 dark:bg-info-500/20 rounded-md" />
                <div className="h-6 w-16 bg-primary-50 dark:bg-primary-900/30 rounded-md" />
                <div className="h-6 w-16 bg-warning-50 dark:bg-warning-400/20 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
