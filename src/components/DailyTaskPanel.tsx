"use client";

import { useState } from "react";
import { DailyTask } from "@/lib/types";

interface DailyTaskPanelProps {
  date: string;
  tasks: DailyTask[];
  onAddTask: (task: Omit<DailyTask, "id" | "created_at">) => void;
  onToggleStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function DailyTaskPanel({
  date,
  tasks,
  onAddTask,
  onToggleStatus,
  onDeleteTask,
}: DailyTaskPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isToday = date === new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({
      user_id: "1",
      date,
      title: title.trim(),
      description: description.trim(),
      status: "pending",
      attachments: [],
    });
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <div className="bg-white dark:bg-surface-dark-secondary rounded-2xl border border-neutral-200/60 dark:border-neutral-600/30 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-600/20 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-200">
              {formattedDate}
            </h3>
            {isToday && (
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-full">
                วันนี้
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-300 dark:text-neutral-500 mt-0.5">
            {tasks.length} งาน • {tasks.filter((t) => t.status === "done").length} เสร็จ
          </p>
        </div>
        <button
          id="btn-add-task"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-xl shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          เพิ่มงาน
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="px-6 py-4 bg-primary-50/50 dark:bg-primary-900/10 border-b border-primary-100 dark:border-primary-800/30 animate-fade-in"
        >
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ชื่องาน..."
            className="w-full px-3 py-2.5 bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-neutral-600/50 rounded-xl text-sm text-neutral-700 dark:text-neutral-100 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 mb-2"
            autoFocus
          />
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="รายละเอียด (ไม่บังคับ)..."
            rows={2}
            className="w-full px-3 py-2.5 bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-neutral-600/50 rounded-xl text-sm text-neutral-700 dark:text-neutral-100 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 mb-3 resize-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              บันทึก
            </button>
          </div>
        </form>
      )}

      {/* Task list */}
      <div className="divide-y divide-neutral-100 dark:divide-neutral-600/20">
        {tasks.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-100 dark:bg-neutral-700/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm text-neutral-300 dark:text-neutral-500">
              ยังไม่มีงานในวันนี้
            </p>
            <p className="text-xs text-neutral-200 dark:text-neutral-600 mt-1">
              กด &quot;+ เพิ่มงาน&quot; เพื่อเริ่มบันทึก
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="px-6 py-4 flex items-start gap-3 group hover:bg-neutral-50/50 dark:hover:bg-neutral-700/10 transition-colors"
            >
              {/* Checkbox */}
              <button
                onClick={() => onToggleStatus(task.id)}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  task.status === "done"
                    ? "bg-primary-500 border-primary-500 text-white"
                    : "border-neutral-300 dark:border-neutral-500 hover:border-primary-400"
                }`}
              >
                {task.status === "done" && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium transition-all ${
                    task.status === "done"
                      ? "text-neutral-300 line-through"
                      : "text-neutral-600 dark:text-neutral-200"
                  }`}
                >
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-xs text-neutral-300 dark:text-neutral-500 mt-0.5 line-clamp-1">
                    {task.description}
                  </p>
                )}
              </div>

              {/* Status badge */}
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  task.status === "done"
                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                    : "bg-warning-50 dark:bg-warning-400/10 text-warning-400"
                }`}
              >
                {task.status === "done" ? "เสร็จ" : "ค้าง"}
              </span>

              {/* Delete */}
              <button
                onClick={() => onDeleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-neutral-200 hover:text-danger-400 transition-all duration-200 shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
