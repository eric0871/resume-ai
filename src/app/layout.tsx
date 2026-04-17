import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ResumeAI — AI Resume Optimization | 简历优化平台",
  description: "AI-powered resume analysis platform for international students. 为国际学生打造的 AI 简历优化工具。",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased scroll-smooth">
      <body className={`${inter.variable} font-sans min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
