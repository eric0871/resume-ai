"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Target,
  Zap,
  Building2,
  ArrowRight,
  CheckCircle2,
  Upload,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: "AI 智能评分",
      description:
        "全维度分析简历质量，精准定位薄弱环节，给出可量化的提升方案。",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "ATS 关键词优化",
      description:
        "深度解析岗位要求，自动匹配高频关键词，大幅提升系统通过率。",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "一键简历改写",
      description:
        "基于分析结果，AI 自动重写经历描述，用数据和成果说话。",
      gradient: "from-blue-600 to-purple-500",
    },
    {
      icon: <Building2 className="w-6 h-6 text-white" />,
      title: "JD 精准匹配",
      description:
        "上传职位描述，智能分析简历匹配度，给出针对性优化建议。",
      gradient: "from-purple-600 to-blue-500",
    },
  ];

  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-blue-600" />,
      title: "上传简历",
      description: "支持 PDF / DOCX 格式，一键上传你的简历",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "AI 分析",
      description: "秒级深度分析，多维评分与详细报告",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-green-600" />,
      title: "获取建议",
      description: "可操作的优化方案，一键改写提升",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "",
      description: "适合初次体验",
      features: [
        "1次简历分析",
        "基础评分报告",
        "有限的关键词建议",
        "社区支持",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/月",
      description: "最受欢迎的方案",
      features: [
        "无限简历分析",
        "完整评分报告",
        "关键词优化建议",
        "5个职位推荐",
        "优先客服支持",
        "导出优化建议",
      ],
      highlighted: true,
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "/月",
      description: "专业套餐",
      features: [
        "Pro 所有功能",
        "无限职位推荐",
        "一对一咨询",
        "简历优化模板库",
        "行业对标分析",
        "24小时专属客服",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="text-sm text-gray-600 hover:text-gray-900 transition hidden sm:block"
            >
              价格
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                登录
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
              >
                开始使用
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-4 py-1.5 text-sm">
            专为留学生设计
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            AI 驱动的
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              简历优化平台
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            基于 AI 深度分析，为国际学生量身打造的简历优化工具。精准匹配 ATS
            关键词，提升面试通过率。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 px-8"
              >
                免费开始分析
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="px-8">
                查看定价
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              核心功能
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              一站式简历优化，从分析到改写全流程覆盖
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Three Steps Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              三步完成优化
            </h2>
            <p className="text-gray-600 text-lg">
              简单几步，让你的简历脱颖而出
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <Card
                key={idx}
                className="text-center border-gray-200 hover:shadow-md transition-all"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="text-sm font-bold text-gray-400 mb-2">
                    步骤 {idx + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              选择适合你的方案
            </h2>
            <p className="text-gray-600 text-lg">透明简单的定价，随时取消</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative overflow-hidden transition-all duration-300 ${
                  plan.highlighted
                    ? "border-2 border-purple-500 shadow-xl scale-105"
                    : "border-gray-200 hover:shadow-lg"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
                <CardContent className="pt-8 pb-6">
                  {plan.highlighted && (
                    <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
                      最受欢迎
                    </Badge>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-500 text-sm">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <Link href="/login" className="block mb-6">
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                          : ""
                      }`}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.price === "$0" ? "免费开始" : "升级方案"}
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl px-8 py-16 sm:px-16 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              准备好优化你的简历了吗？
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              加入 10,000+ 已成功拿到 Offer 的留学生
            </p>
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8"
              >
                免费开始
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">ResumeAI</span>
              </div>
              <p className="text-sm">为国际学生打造的 AI 简历优化平台</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">产品</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    功能
                  </a>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition">
                    价格
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">资源</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    博客
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    文档
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">关于</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    隐私政策
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    服务条款
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            &copy; 2026 ResumeAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
