"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, FileText } from "lucide-react";

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "适合初次体验",
      features: [
        "1次简历分析",
        "基础评分报告",
        "有限的关键词建议",
        "社区支持",
      ],
      notIncluded: [
        "职位推荐",
        "优先客服",
        "一对一咨询",
        "行业对标分析",
      ],
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "月度订阅 — 最受欢迎",
      features: [
        "无限简历分析",
        "完整评分报告",
        "关键词优化建议",
        "5个职位推荐",
        "优先客服支持",
        "导出优化建议",
      ],
      notIncluded: [
        "无限职位推荐",
        "一对一咨询",
        "简历优化模板",
        "行业对标分析",
      ],
      highlighted: true,
    },
    {
      name: "Premium",
      price: "$19.99",
      description: "专业套餐",
      features: [
        "Pro所有功能",
        "无限职位推荐",
        "一对一咨询（15分钟/月）",
        "简历优化模板库",
        "行业对标分析",
        "24小时专属客服",
      ],
      notIncluded: [],
    },
  ];

  const faqItems = [
    {
      q: "可以随时取消订阅吗?",
      a: "是的，随时可以取消订阅，不会被扣费。取消后仍可使用当月服务直到周期结束。",
    },
    {
      q: "支持哪些付款方式?",
      a: "我们支持信用卡、借记卡和PayPal。所有交易均加密保护，确保安全。",
    },
    {
      q: "Free版本的限制是什么?",
      a: "Free版本每月只能分析1份简历，不包含职位推荐。如需更多功能，可升级到Pro或Premium。",
    },
    {
      q: "学生是否有优惠?",
      a: "是的！学生可享受50%折扣。请用你的学校邮箱注册，系统会自动验证。",
    },
    {
      q: "如何获得退款?",
      a: "如果不满意服务，可在购买后30天内申请全额退款，无需问题。",
    },
    {
      q: "为什么需要关键词分析?",
      a: "很多公司使用ATS（应聘者追踪系统）筛选简历。我们的关键词分析确保你的简历通过ATS筛选，进入HR手中。",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              返回首页
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900">
              透明简单的价格
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              选择适合你的方案，开始优化你的简历
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl scale-105 md:scale-110"
                    : "bg-white border border-slate-200 hover:shadow-lg"
                }`}
              >
                <div className="p-8">
                  {plan.highlighted && (
                    <div className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-semibold rounded-full mb-4">
                      最受欢迎
                    </div>
                  )}

                  <div className="mb-6">
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        plan.highlighted ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        plan.highlighted
                          ? "text-blue-100"
                          : "text-slate-600"
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8 pb-8 border-b border-opacity-20 border-slate-200">
                    <span
                      className={`text-5xl font-bold ${
                        plan.highlighted ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.price !== "$0" && (
                      <span
                        className={`text-sm ml-2 ${
                          plan.highlighted
                            ? "text-blue-100"
                            : "text-slate-600"
                        }`}
                      >
                        /月
                      </span>
                    )}
                  </div>

                  <Link href="/login" className="w-full block mb-8">
                    <Button
                      className="w-full h-12"
                      variant={plan.highlighted ? "secondary" : "outline"}
                    >
                      {plan.price === "$0" ? "免费开始" : "升级方案"}
                    </Button>
                  </Link>

                  {/* Included Features */}
                  <div className="mb-8">
                    <h4
                      className={`text-sm font-semibold mb-4 ${
                        plan.highlighted
                          ? "text-blue-100"
                          : "text-slate-700"
                      }`}
                    >
                      包含功能
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              plan.highlighted
                                ? "text-blue-100"
                                : "text-green-500"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              plan.highlighted
                                ? "text-blue-50"
                                : "text-slate-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included Features */}
                  {plan.notIncluded.length > 0 && (
                    <div>
                      <h4
                        className={`text-sm font-semibold mb-4 ${
                          plan.highlighted
                            ? "text-blue-200"
                            : "text-slate-500"
                        }`}
                      >
                        不包含
                      </h4>
                      <ul className="space-y-3">
                        {plan.notIncluded.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 flex-shrink-0 mt-0.5 rounded-full border-2 ${
                                plan.highlighted
                                  ? "border-blue-200"
                                  : "border-slate-300"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                plan.highlighted
                                  ? "text-blue-200"
                                  : "text-slate-500"
                              }`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900">
                常见问题
              </h2>
              <p className="text-slate-600 mt-4">
                找不到答案? 联系我们的支持团队
              </p>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, idx) => (
                <details
                  key={idx}
                  className="group border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <summary className="flex items-start justify-between cursor-pointer">
                    <h3 className="text-lg font-semibold text-slate-900 pr-4">
                      {item.q}
                    </h3>
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                      <div className="text-slate-600 group-open:rotate-180 transition-transform">
                        ▼
                      </div>
                    </div>
                  </summary>
                  <p className="mt-4 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 py-16 sm:py-20 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                准备好优化你的简历了吗?
              </h2>
              <p className="text-lg text-blue-100">
                加入数千名已成功获得Dream Offer的留学生
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                >
                  开始免费分析
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  了解更多功能
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; 2026 ResumeAI. 专为国际学生设计的AI简历分析平台。</p>
        </div>
      </footer>
    </div>
  );
}
