"use client";

import { mockPromotions } from "@/lib/mock-data";

const gradients = [
  "from-accent-400/20 to-primary-400/10",
  "from-primary-400/20 to-info-400/10",
  "from-info-400/15 to-accent-400/10",
];

const badges = [
  { bg: "bg-accent-100 dark:bg-accent-800/40", text: "text-accent-700 dark:text-accent-300" },
  { bg: "bg-primary-100 dark:bg-primary-800/40", text: "text-primary-700 dark:text-primary-300" },
  { bg: "bg-info-100 dark:bg-info-500/20", text: "text-info-500 dark:text-info-300" },
];

export default function PromoSection() {
  return (
    <section id="promotions" className="py-24 px-6 bg-neutral-50/50 dark:bg-surface-dark-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-3">
            โปรโมชั่น & ข่าวสาร
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-700 dark:text-neutral-100 mb-4">
            อัพเดทล่าสุด
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mockPromotions.map((promo, i) => (
            <div
              key={promo.id}
              className="group relative bg-white dark:bg-surface-dark-secondary rounded-2xl border border-neutral-200/60 dark:border-neutral-600/30 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Gradient header */}
              <div
                className={`h-32 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}
              >
                <span className="text-4xl">{promo.title.split(" ")[0]}</span>
              </div>

              <div className="p-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    badges[i % badges.length].bg
                  } ${badges[i % badges.length].text} mb-3`}
                >
                  {promo.target_role === "all" ? "ทุกคน" : promo.target_role}
                </span>
                <h3 className="text-base font-semibold text-neutral-700 dark:text-neutral-100 mb-2 group-hover:text-primary-600 transition-colors">
                  {promo.title.replace(/^[^\s]+\s/, "")}
                </h3>
                <p className="text-sm text-neutral-400 dark:text-neutral-300 leading-relaxed line-clamp-3">
                  {promo.body}
                </p>
                <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-600/30">
                  <p className="text-xs text-neutral-300 dark:text-neutral-400">
                    {new Date(promo.published_at).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
