// Types for the Daily Work Log System

export type UserRole = "customer" | "admin" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export type TaskStatus = "done" | "pending";

export interface DailyTask {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  status: TaskStatus;
  attachments: string[];
  created_at: string;
}

export interface Promotion {
  id: string;
  title: string;
  body: string;
  image_url: string;
  published_at: string;
  is_active: boolean;
  target_role: UserRole | "all";
}

// Calendar types
export interface DayData {
  date: string;
  taskCount: number;
  completedCount: number;
  level: 0 | 1 | 2 | 3 | 4; // 0=empty, 4=full
}
