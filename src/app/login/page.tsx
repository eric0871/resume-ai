"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 flex-col justify-between p-12 text-white">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">ResumeAI</span>
          </Link>

          <h1 className="text-4xl font-bold leading-tight mb-4">
            AI 驱动的
            <br />
            简历分析平台
          </h1>
          <p className="text-blue-100 text-lg max-w-sm">
            专为国际学生设计，帮助你优化简历、拿到梦想 Offer。
          </p>
        </div>

        <div className="space-y-4">
          {[
            "秒级 AI 分析，全维度评估",
            "ATS 关键词优化，提升通过率",
            "H1B 职位智能推荐",
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-200" />
              <span className="text-blue-100">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md border-gray-200 shadow-lg">
          <CardContent className="pt-8 pb-8">
            {/* Mobile logo */}
            <Link
              href="/"
              className="lg:hidden flex items-center gap-2 mb-8 justify-center"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </Link>

            <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center lg:text-left">
              {isLogin ? "欢迎返回" : "创建账户"}
            </h2>
            <p className="text-gray-500 text-sm mb-8 text-center lg:text-left">
              {isLogin
                ? "登录账户继续优化简历"
                : "注册账户开始分析简历"}
            </p>

            {/* Google */}
            <Button
              variant="outline"
              className="w-full mb-6"
              onClick={handleGoogle}
              disabled={isLoading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="mr-2">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              使用 Google 继续
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-xs text-gray-400">
                  或使用邮箱
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">姓名</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required={!isLogin}
                    placeholder="请输入姓名"
                    className="mt-1.5"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="mt-1.5"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
              >
                {isLoading
                  ? "加载中..."
                  : isLogin
                  ? "登录"
                  : "创建账户"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              {isLogin ? "还没有账户? " : "已有账户? "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setForm({ email: "", password: "", name: "" });
                }}
                className="text-blue-600 font-medium hover:underline"
              >
                {isLogin ? "注册" : "登录"}
              </button>
            </p>

            <p className="text-center text-xs text-gray-400 mt-6">
              点击{isLogin ? "登录" : "注册"}表示同意我们的
              <a href="#" className="underline">
                服务条款
              </a>
              和
              <a href="#" className="underline">
                隐私政策
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
