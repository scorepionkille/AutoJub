"use client";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "ปฏิทินบันทึกงาน",
    description: "ดูภาพรวมผลงานทั้งปีด้วยปฏิทินแบบ GitHub Contribution Graph",
    color: "primary" as const,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "ระบบ Role-based",
    description: "จัดการสิทธิ์ตาม Role: ลูกค้าดูข้อมูล, Admin จัดการทุกอย่าง, Staff บันทึกงาน",
    color: "accent" as const,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "สถิติแบบ Real-time",
    description: "ดูสถิติงานที่เสร็จ, งานค้าง และเปอร์เซ็นต์ความสำเร็จแบบ Real-time",
    color: "info" as const,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: "แก้ไขได้ทันที",
    description: "กดที่วันในปฏิทิน แก้ไขงานได้ทันที ไม่ต้องเปลี่ยนหน้า",
    color: "warning" as const,
  },
];

const colorMap = {
  primary: {
    bg: "bg-primary-50 dark:bg-primary-900/30",
    icon: "text-primary-600 dark:text-primary-400",
    border: "border-primary-100 dark:border-primary-800/50",
    glow: "group-hover:shadow-primary-500/10",
  },
  accent: {
    bg: "bg-accent-50 dark:bg-accent-900/30",
    icon: "text-accent-600 dark:text-accent-400",
    border: "border-accent-100 dark:border-accent-800/50",
    glow: "group-hover:shadow-accent-500/10",
  },
  info: {
    bg: "bg-info-50 dark:bg-info-500/10",
    icon: "text-info-500 dark:text-info-300",
    border: "border-info-100 dark:border-info-500/20",
    glow: "group-hover:shadow-info-500/10",
  },
  warning: {
    bg: "bg-warning-50 dark:bg-warning-400/10",
    icon: "text-warning-400 dark:text-warning-300",
    border: "border-warning-100 dark:border-warning-400/20",
    glow: "group-hover:shadow-warning-300/10",
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3">
            ฟีเจอร์
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-700 dark:text-neutral-100 mb-4">
            ทุกอย่างที่ต้องการ
          </h2>
          <p className="text-neutral-400 dark:text-neutral-300 max-w-lg mx-auto">
            ครบจบในที่เดียว สำหรับการบันทึกและติดตามงานประจำวัน
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const c = colorMap[f.color];
            return (
              <div
                key={i}
                className={`group relative p-6 rounded-2xl bg-white dark:bg-surface-dark-secondary border ${c.border} hover:shadow-xl ${c.glow} hover:-translate-y-1 transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${c.bg} ${c.icon} flex items-center justify-center mb-4`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-100 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-neutral-400 dark:text-neutral-300 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
