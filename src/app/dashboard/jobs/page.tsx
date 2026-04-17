"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, MapPin, Badge, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
  h1bSponsor: boolean;
  matchPercentage: number;
  link: string;
  salary?: string;
}

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockJobs: Job[] = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      skills: ["Python", "JavaScript", "SQL", "React", "AWS"],
      h1bSponsor: true,
      matchPercentage: 94,
      salary: "$200k-250k",
      link: "https://careers.google.com",
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "Meta",
      location: "Menlo Park, CA",
      skills: ["JavaScript", "React", "Node.js", "GraphQL", "PostgreSQL"],
      h1bSponsor: true,
      matchPercentage: 87,
      salary: "$190k-240k",
      link: "https://www.metacareers.com",
    },
    {
      id: "3",
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      skills: [
        "Product Strategy",
        "Analytics",
        "Project Management",
        "Python",
        "SQL",
      ],
      h1bSponsor: true,
      matchPercentage: 82,
      salary: "$180k-220k",
      link: "https://careers.microsoft.com",
    },
    {
      id: "4",
      title: "Machine Learning Engineer",
      company: "OpenAI",
      location: "San Francisco, CA",
      skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Docker"],
      h1bSponsor: true,
      matchPercentage: 78,
      salary: "$210k-260k",
      link: "https://openai.com/careers",
    },
    {
      id: "5",
      title: "Frontend Engineer",
      company: "Apple",
      location: "Cupertino, CA",
      skills: ["JavaScript", "React", "CSS", "TypeScript", "Git"],
      h1bSponsor: true,
      matchPercentage: 85,
      salary: "$185k-235k",
      link: "https://www.apple.com/careers",
    },
    {
      id: "6",
      title: "DevOps Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      skills: ["Docker", "Kubernetes", "AWS", "Python", "Jenkins"],
      h1bSponsor: true,
      matchPercentage: 81,
      salary: "$175k-215k",
      link: "https://www.amazon.jobs",
    },
  ];

  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50";
    if (percentage >= 80) return "text-blue-600 bg-blue-50";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">职位推荐</h1>
        <p className="text-slate-600 mt-2">
          根据你的简历和技能匹配的H1B赞助职位
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-4 py-3">
          <Search className="w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="搜索职位、公司或技能..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-0 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <p className="text-sm text-slate-600 mb-3">热门筛选:</p>
          <div className="flex flex-wrap gap-2">
            {["Software Engineer", "Product Manager", "DevOps", "Machine Learning"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setSearchQuery(filter)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm transition-colors"
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Company & Title */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {job.company[0]}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-slate-600 font-medium">{job.company}</p>
                    </div>
                  </div>

                  {/* Location & Salary */}
                  <div className="flex items-center gap-4 mt-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    {job.salary && (
                      <div className="px-3 py-1 bg-slate-100 rounded-lg font-semibold text-slate-900">
                        {job.salary}
                      </div>
                    )}
                  </div>

                  {/* Skills & Badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium hover:bg-slate-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                        +{job.skills.length - 4} 更多
                      </span>
                    )}
                  </div>

                  {/* H1B Sponsor Badge */}
                  {job.h1bSponsor && (
                    <div className="mt-4 flex items-center gap-1.5 text-green-700 text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      H1B赞助
                    </div>
                  )}
                </div>

                {/* Match Score & Action */}
                <div className="flex flex-col items-end gap-4">
                  <div
                    className={`flex flex-col items-center p-3 rounded-lg ${getMatchColor(
                      job.matchPercentage
                    )}`}
                  >
                    <span className="text-2xl font-bold">
                      {job.matchPercentage}%
                    </span>
                    <span className="text-xs">匹配度</span>
                  </div>

                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      查看职位
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">未找到匹配的职位</p>
            <p className="text-slate-500 text-sm mt-1">
              尝试更改搜索条件或查看所有职位
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-xl border border-slate-200 p-6">
        <div className="text-center">
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {filteredJobs.length}
          </p>
          <p className="text-slate-600 text-sm mt-2">匹配的职位</p>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">
            {filteredJobs.filter((j) => j.h1bSponsor).length}
          </p>
          <p className="text-slate-600 text-sm mt-2">H1B赞助职位</p>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold text-purple-600">
            {Math.round(
              filteredJobs.reduce((sum, job) => sum + job.matchPercentage, 0) /
                filteredJobs.length
            )}
            %
          </p>
          <p className="text-slate-600 text-sm mt-2">平均匹配度</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-3">优化建议</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>• 在简历中添加缺失的关键词以提高匹配度</li>
          <li>• 突出与目标职位相关的项目经验</li>
          <li>• 准备技术面试，涵盖常见的数据结构和算法题目</li>
          <li>• 完善LinkedIn档案，确保与简历内容一致</li>
        </ul>
      </div>
    </div>
  );
}
