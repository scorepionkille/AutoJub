import { User, DailyTask, Promotion, DayData } from "./types";

// Mock user
export const mockUser: User = {
  id: "1",
  name: "สมชาย ใจดี",
  email: "somchai@worklog.com",
  role: "admin",
  avatar_url: "",
  created_at: "2025-01-15T00:00:00Z",
};

// Generate mock calendar data for the past year
export function generateCalendarData(): DayData[] {
  const data: DayData[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 11);
  startDate.setDate(1);

  const current = new Date(startDate);
  let seed = 1;
  while (current <= today) {
    const dateStr = current.toISOString().split("T")[0];
    const isWeekend = current.getDay() === 0 || current.getDay() === 6;
    
    // Use pseudo-random deterministic value based on seed to avoid hydration mismatch
    const getRand = () => Math.abs(Math.sin(seed++) * 10000) % 1;
    const rand = getRand();

    let taskCount = 0;
    let completedCount = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (!isWeekend && rand > 0.15) {
      taskCount = Math.floor(getRand() * 8) + 1;
      completedCount = Math.floor(getRand() * (taskCount + 1));
      if (taskCount <= 2) level = 1;
      else if (taskCount <= 4) level = 2;
      else if (taskCount <= 6) level = 3;
      else level = 4;
    }

    data.push({ date: dateStr, taskCount, completedCount, level });
    current.setDate(current.getDate() + 1);
  }
  return data;
}

// Mock tasks for today
export const mockTasks: DailyTask[] = [
  {
    id: "1",
    user_id: "1",
    date: new Date().toISOString().split("T")[0],
    title: "ออกแบบ UI หน้า Dashboard",
    description: "สร้าง wireframe และ mockup สำหรับหน้า Dashboard ใหม่ รวมถึง GitHub-style calendar",
    status: "done",
    attachments: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "1",
    date: new Date().toISOString().split("T")[0],
    title: "ประชุม Sprint Planning",
    description: "ประชุมวางแผน Sprint #24 กับทีม Development",
    status: "done",
    attachments: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "1",
    date: new Date().toISOString().split("T")[0],
    title: "เขียน API สำหรับระบบ Task",
    description: "พัฒนา REST API endpoints สำหรับ CRUD operations ของ Daily Tasks",
    status: "pending",
    attachments: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    user_id: "1",
    date: new Date().toISOString().split("T")[0],
    title: "Review Pull Request #142",
    description: "ตรวจสอบโค้ดและ approve PR ของทีม Frontend",
    status: "pending",
    attachments: [],
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    user_id: "1",
    date: new Date().toISOString().split("T")[0],
    title: "อัพเดทเอกสาร API Documentation",
    description: "เพิ่มเอกสารสำหรับ endpoints ใหม่ใน Swagger",
    status: "done",
    attachments: [],
    created_at: new Date().toISOString(),
  },
];

// Mock promotions
export const mockPromotions: Promotion[] = [
  {
    id: "1",
    title: "🎉 อัพเกรด Premium ลด 50%",
    body: "สมัครแพ็กเกจ Premium วันนี้ รับส่วนลดพิเศษ 50% สำหรับ 3 เดือนแรก พร้อมฟีเจอร์ Analytics ขั้นสูง",
    image_url: "",
    published_at: "2026-06-01T00:00:00Z",
    is_active: true,
    target_role: "all",
  },
  {
    id: "2",
    title: "📊 รายงานประจำเดือนพร้อมแล้ว",
    body: "ดูสรุปผลงานของทีมประจำเดือนพฤษภาคม พร้อม insights และ recommendations",
    image_url: "",
    published_at: "2026-06-05T00:00:00Z",
    is_active: true,
    target_role: "admin",
  },
  {
    id: "3",
    title: "🚀 ฟีเจอร์ใหม่: Auto-Report",
    body: "ระบบสร้างรายงานอัตโนมัติจากการบันทึกงานรายวัน ส่งตรงถึงอีเมลหัวหน้าทีม",
    image_url: "",
    published_at: "2026-06-10T00:00:00Z",
    is_active: true,
    target_role: "all",
  },
];

// Stats helpers
export function getStats(tasks: DailyTask[]) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
  return { total, done, pending, percentage };
}
