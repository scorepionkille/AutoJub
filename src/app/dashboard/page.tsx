"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import StatsCards from "@/components/StatsCards";
import ContributionCalendar from "@/components/ContributionCalendar";
import DailyTaskPanel from "@/components/DailyTaskPanel";
import { generateCalendarData, mockTasks, getStats } from "@/lib/mock-data";
import { DailyTask } from "@/lib/types";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardPage() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState<DailyTask[]>(mockTasks);
  const [userName, setUserName] = useState("Admin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const user = localStorage.getItem("worklog_user");
      if (user) {
        const parsed = JSON.parse(user);
        setUserName(parsed.name || "Admin");
      }
    } catch {
      // ignore
    }
  }, []);

  const calendarData = useMemo(() => generateCalendarData(), []);

  const filteredTasks = useMemo(
    () => tasks.filter((t) => t.date === selectedDate),
    [tasks, selectedDate]
  );

  const stats = useMemo(() => getStats(filteredTasks), [filteredTasks]);

  const handleAddTask = useCallback(
    (task: Omit<DailyTask, "id" | "created_at">) => {
      const newTask: DailyTask = {
        ...task,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setTasks((prev) => [...prev, newTask]);
    },
    []
  );

  const handleToggleStatus = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "pending" : "done" }
          : t
      )
    );
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-surface-dark overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 h-full w-64 animate-slide-in-left">
            <Sidebar onToggle={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white dark:bg-surface-dark-secondary border-b border-neutral-200/60 dark:border-neutral-600/30 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-neutral-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-semibold text-neutral-700 dark:text-neutral-100">
                สวัสดี, {userName} 👋
              </h1>
              <p className="text-xs text-neutral-300 dark:text-neutral-500" suppressHydrationWarning>
                {new Date().toLocaleDateString("th-TH", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="relative p-2 text-neutral-300 hover:text-neutral-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-300 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary-500/20">
              {userName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <StatsCards
            total={stats.total}
            percentage={stats.percentage}
            pending={stats.pending}
          />

          {/* Calendar */}
          <ContributionCalendar
            data={calendarData}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
          />

          {/* Daily tasks */}
          <DailyTaskPanel
            date={selectedDate}
            tasks={filteredTasks}
            onAddTask={handleAddTask}
            onToggleStatus={handleToggleStatus}
            onDeleteTask={handleDeleteTask}
          />
        </main>
      </div>
    </div>
  );
}
