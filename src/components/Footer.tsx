import Link from "next/link";

export default function Footer() {
  return (
    <footer id="about" className="bg-neutral-700 dark:bg-surface-dark text-neutral-300 dark:text-neutral-400 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-lg font-bold text-white">
                Work<span className="text-primary-400">Log</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              ระบบบันทึกงานประจำวันที่ช่วยให้ทีมของคุณทำงานได้อย่างมีประสิทธิภาพ
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">ผลิตภัณฑ์</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-primary-400 transition-colors">ฟีเจอร์</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">ราคา</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">บริษัท</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">เกี่ยวกับเรา</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">ร่วมงาน</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">ติดต่อ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">สนับสนุน</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">เอกสาร</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">คู่มือการใช้งาน</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            © 2026 WorkLog. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
