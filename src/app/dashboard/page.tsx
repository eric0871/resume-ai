"use client";

import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "本月分析", value: "8", color: "bg-blue-50 text-blue-600" },
    { label: "最高评分", value: "92", color: "bg-emerald-50 text-emerald-600" },
    { label: "匹配职位", value: "15", color: "bg-violet-50 text-violet-600" },
  ];

  const history = [
    { id: "demo-1", name: "John_Doe_Resume_2024.pdf", date: "2024-04-10", score: 85 },
    { id: "demo-2", name: "Jane_Smith_CV.pdf", date: "2024-04-08", score: 78 },
    { id: "demo-3", name: "Resume_Final_v3.pdf", date: "2024-04-05", score: 88 },
    { id: "demo-4", name: "Alex_Wang_简历.pdf", date: "2024-03-28", score: 92 },
    { id: "demo-5", name: "Resume_Backup.pdf", date: "2024-03-20", score: 81 },
  ];

  const scoreColor = (s: number) =>
    s >= 90 ? "text-emerald-600 bg-emerald-50" : s >= 80 ? "text-blue-600 bg-blue-50" : s >= 70 ? "text-amber-600 bg-amber-50" : "text-red-600 bg-red-50";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">欢迎回来</h1>
        <p className="text-slate-500 text-sm mt-1">继续优化你的简历，向 Dream Offer 更近一步</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-sm transition-shadow">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color.split(" ")[1]}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/dashboard/upload" className="group">
          <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-8 hover:border-slate-400 transition-all">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 mb-3 group-hover:text-slate-600 transition"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            <h3 className="font-semibold mb-1">分析新简历</h3>
            <p className="text-slate-500 text-sm">上传 PDF 格式简历，获得 AI 评分和优化建议</p>
          </div>
        </Link>
        <Link href="/dashboard/jobs" className="group">
          <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-8 hover:border-slate-400 transition-all">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 mb-3 group-hover:text-slate-600 transition"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            <h3 className="font-semibold mb-1">浏览匹配职位</h3>
            <p className="text-slate-500 text-sm">查看 H1B 赞助职位推荐和技能要求</p>
          </div>
        </Link>
      </div>

      {/* History */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold">分析历史</h2>
          <Link href="/dashboard/upload" className="text-xs text-slate-500 hover:text-slate-900 transition">
            分析更多 →
          </Link>
        </div>
        <div className="divide-y divide-slate-100">
          {history.map((item) => (
            <Link
              key={item.id}
              href={`/dashboard/analysis/${item.id}`}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-slate-400 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                <span className="text-sm truncate">{item.name}</span>
                <span className="text-xs text-slate-400 flex-shrink-0">{item.date}</span>
              </div>
              <span className={`text-sm font-bold px-2.5 py-0.5 rounded-lg ${scoreColor(item.score)}`}>
                {item.score}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
