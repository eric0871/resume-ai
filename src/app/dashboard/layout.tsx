"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BarChart3,
  Upload,
  Briefcase,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "总览",
      href: "/dashboard",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      label: "上传简历",
      href: "/dashboard/upload",
      icon: <Upload className="w-4 h-4" />,
    },
    {
      label: "职位推荐",
      href: "/dashboard/jobs",
      icon: <Briefcase className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
              ResumeAI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "text-gray-600"
                    }
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-gray-500 hover:text-gray-700 hidden sm:flex"
            >
              <LogOut className="w-4 h-4 mr-1" />
              退出
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
