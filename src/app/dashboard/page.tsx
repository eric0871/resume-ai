"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Upload,
  Briefcase,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      label: "本月分析",
      value: "8",
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "最高评分",
      value: "92",
      icon: <FileText className="w-5 h-5 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "匹配职位",
      value: "15",
      icon: <Briefcase className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  const history = [
    {
      id: "demo-1",
      name: "John_Doe_Resume_2024.pdf",
      date: "2024-04-10",
      score: 85,
    },
    {
      id: "demo-2",
      name: "Jane_Smith_CV.pdf",
      date: "2024-04-08",
      score: 78,
    },
    {
      id: "demo-3",
      name: "Resume_Final_v3.pdf",
      date: "2024-04-05",
      score: 88,
    },
    {
      id: "demo-4",
      name: "Alex_Wang_简历.pdf",
      date: "2024-03-28",
      score: 92,
    },
    {
      id: "demo-5",
      name: "Resume_Backup.pdf",
      date: "2024-03-20",
      score: 81,
    },
  ];

  const scoreColor = (s: number) =>
    s >= 90
      ? "text-green-600 bg-green-50"
      : s >= 80
      ? "text-blue-600 bg-blue-50"
      : s >= 70
      ? "text-amber-600 bg-amber-50"
      : "text-red-600 bg-red-50";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">欢迎回来</h1>
        <p className="text-gray-600 mt-1">
          继续优化你的简历，向 Dream Offer 更近一步
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-gray-200 hover:shadow-md transition">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="border-gray-200 hover:shadow-md transition hover:border-blue-300 cursor-pointer group">
          <Link href="/dashboard/upload">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                分析新简历
              </h3>
              <p className="text-gray-500 text-sm">
                上传 PDF 格式简历，获得 AI 评分和优化建议
              </p>
            </CardContent>
          </Link>
        </Card>
        <Card className="border-gray-200 hover:shadow-md transition hover:border-purple-300 cursor-pointer group">
          <Link href="/dashboard/jobs">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                浏览匹配职位
              </h3>
              <p className="text-gray-500 text-sm">
                查看 H1B 赞助职位推荐和技能要求
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* History */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">分析历史</CardTitle>
            <Link href="/dashboard/upload">
              <Button variant="ghost" size="sm" className="text-blue-600">
                分析更多
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {history.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/analysis/${item.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-900 truncate">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {item.date}
                  </span>
                </div>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-lg ${scoreColor(
                    item.score
                  )}`}
                >
                  {item.score}
                </span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
