'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Target, FileText, Lightbulb, TrendingUp,
  GraduationCap, Shield, ChevronRight, ChevronDown,
  Sparkles, Download, Upload, CheckCircle2, XCircle,
  AlertTriangle, Zap, Copy, Check, Loader2, FileUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeAnalysis, JDAnalysis } from '@/types';

// ─── Score Ring Component ─────────────────────────────────────────────

function ScoreRing({ score, size = 140, label }: { score: number; size?: number; label?: string }) {
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#3b82f6' : score >= 40 ? '#f59e0b' : '#ef4444';
  const bgColor = score >= 80 ? '#dcfce7' : score >= 60 ? '#dbeafe' : score >= 40 ? '#fef3c7' : '#fee2e2';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f3f4f6" strokeWidth="12" />
          <circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={color} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>{score}</span>
          <span className="text-xs text-gray-400 font-medium">/ 100</span>
        </div>
      </div>
      {label && (
        <Badge
          className="text-xs px-3 py-1 font-medium border-0"
          style={{ backgroundColor: bgColor, color }}
        >
          {label}
        </Badge>
      )}
    </div>
  );
}

// ─── Score Bar Component ──────────────────────────────────────────────

function ScoreBar({ label, score, icon: Icon }: { label: string; score: number; icon: React.ElementType }) {
  const color = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-blue-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';
  const textColor = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-blue-600' : score >= 40 ? 'text-amber-600' : 'text-red-600';
  const bgColor = score >= 80 ? 'bg-green-50' : score >= 60 ? 'bg-blue-50' : score >= 40 ? 'bg-amber-50' : 'bg-red-50';

  return (
    <div className="group">
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <div className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${textColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-medium text-gray-700">{label}</span>
            <span className={`font-bold ${textColor}`}>{score}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Expandable Section ───────────────────────────────────────────────

function ExpandableSection({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-800">{title}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 border-t bg-gray-50/50">{children}</div>}
    </div>
  );
}

// ─── JD Analysis Panel ────────────────────────────────────────────────

function JDAnalysisPanel({ resumeText }: { resumeText: string }) {
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JDAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jd.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription: jd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.jdAnalysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : '分析失败');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    const scoreColor = result.matchScore >= 80 ? 'text-green-600' : result.matchScore >= 60 ? 'text-blue-600' : 'text-amber-600';
    return (
      <div className="space-y-5">
        {/* Match Score */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div>
            <p className="text-sm text-gray-600">岗位匹配度</p>
            <p className={`text-3xl font-bold ${scoreColor}`}>{result.matchScore}%</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setResult(null); setJd(''); }}>
            重新分析
          </Button>
        </div>

        {/* Skills Match */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-green-50 border border-green-100">
            <p className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 已匹配技能
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedSkills.map(s => (
                <Badge key={s} variant="outline" className="border-green-300 text-green-700 bg-white text-xs">{s}</Badge>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-red-50 border border-red-100">
            <p className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" /> 缺失技能
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.missingSkills.map(s => (
                <Badge key={s} variant="outline" className="border-red-300 text-red-700 bg-white text-xs">{s}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Competitive Advantages & Red Flags */}
        {result.competitiveAdvantages.length > 0 && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <p className="text-sm font-medium text-emerald-700 mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> 竞争优势
            </p>
            <ul className="space-y-1.5">
              {result.competitiveAdvantages.map((a, i) => (
                <li key={i} className="text-sm text-emerald-800 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {a}
                </li>
              ))}
            </ul>
          </div>
        )}
        {result.redFlags.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
            <p className="text-sm font-medium text-amber-700 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> 风险提示
            </p>
            <ul className="space-y-1.5">
              {result.redFlags.map((f, i) => (
                <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tailored Suggestions */}
        <div className="space-y-3">
          <p className="font-medium text-gray-800">针对性优化建议</p>
          {result.tailoredSuggestions.map((s, i) => (
            <div key={i} className="border rounded-xl p-4 space-y-2 bg-white">
              <Badge variant="outline" className="text-xs">{s.section}</Badge>
              <div className="text-sm text-gray-500">当前: {s.current}</div>
              <div className="text-sm font-medium text-gray-900 bg-blue-50 p-2 rounded-lg">建议: {s.suggested}</div>
              <div className="text-xs text-gray-500 italic">原因: {s.reason}</div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">{result.summary}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <FileUp className="w-10 h-10 text-blue-400 mx-auto mb-3" />
        <p className="text-sm text-gray-600">粘贴目标职位的JD（Job Description），获取针对性的简历优化建议</p>
      </div>
      <Textarea
        placeholder="在此粘贴职位描述..."
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        rows={8}
        className="resize-none text-sm"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        onClick={handleAnalyze}
        disabled={loading || jd.trim().length < 20}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
      >
        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 分析中...</> : <>
          <Target className="w-4 h-4 mr-2" /> 开始JD匹配分析
        </>}
      </Button>
    </div>
  );
}

// ─── Generate Resume Panel ────────────────────────────────────────────

function GenerateResumePanel({ resumeText, analysis }: { resumeText: string; analysis: ResumeAnalysis }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, analysis }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.optimizedResume);
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (result) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-800">优化后的简历</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <><Check className="w-3.5 h-3.5 mr-1" />已复制</> : <><Copy className="w-3.5 h-3.5 mr-1" />复制</>}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setResult(null)}>重新生成</Button>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-6 text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-[600px] overflow-y-auto">
          {result}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8 space-y-4">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto">
        <Sparkles className="w-8 h-8 text-blue-600" />
      </div>
      <div>
        <p className="font-medium text-gray-800">AI 一键生成优化简历</p>
        <p className="text-sm text-gray-500 mt-1">基于分析结果，自动优化你的简历内容和措辞</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-purple-600 px-8"
      >
        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 生成中，请稍候...</> : <>
          <Sparkles className="w-4 h-4 mr-2" /> 生成优化简历
        </>}
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────

export default function AnalysisPage() {
  const [data, setData] = useState<ResumeAnalysis | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load analysis from sessionStorage (set by upload page)
    const stored = sessionStorage.getItem('analysisResult');
    const storedText = sessionStorage.getItem('resumeText');
    if (stored) {
      try {
        setData(JSON.parse(stored));
        setResumeText(storedText || '');
      } catch {
        setData(getFallbackData());
      }
    } else {
      setData(getFallbackData());
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto" />
          <p className="text-gray-500">加载分析报告中...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const scoreLabel = data.overallScore >= 85 ? '优秀' : data.overallScore >= 70 ? '良好' : data.overallScore >= 50 ? '中等' : '需改进';

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> 返回
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">简历分析报告</h1>
            <p className="text-sm text-gray-500">AI 深度分析 · 专为H1B求职优化</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="w-3.5 h-3.5" /> 导出报告
        </Button>
      </div>

      {/* Score Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <ScoreRing score={data.overallScore} label={scoreLabel} />
            <p className="mt-4 font-semibold text-gray-800">综合评分</p>
            <p className="text-xs text-gray-400 mt-1">基于6个维度的综合分析</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">各维度评分</CardTitle>
            <CardDescription>点击各项查看详细分析</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <ScoreBar label="格式规范" score={data.sections.format.score} icon={FileText} />
            <ScoreBar label="内容质量" score={data.sections.content.score} icon={Lightbulb} />
            <ScoreBar label="关键词覆盖" score={data.sections.keywords.industryRelevance} icon={Target} />
            <ScoreBar label="经验描述" score={data.sections.experience.score} icon={TrendingUp} />
            <ScoreBar label="教育背景" score={data.sections.education.score} icon={GraduationCap} />
            <ScoreBar label="ATS兼容性" score={data.atsCompatibility} icon={Shield} />
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <CardContent className="py-6">
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </CardContent>
      </Card>

      {/* Top 3 Improvements */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <CardTitle className="text-white flex items-center gap-2 text-base">
            <Lightbulb className="w-5 h-5" /> 最重要的改进建议
          </CardTitle>
        </div>
        <CardContent className="pt-5">
          <div className="space-y-4">
            {data.topImprovements.map((tip, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center shrink-0 text-sm font-bold shadow-sm">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed pt-1">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="keywords" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full bg-gray-100 p-1 rounded-xl h-auto">
          <TabsTrigger value="keywords" className="rounded-lg py-2 text-xs sm:text-sm">关键词</TabsTrigger>
          <TabsTrigger value="experience" className="rounded-lg py-2 text-xs sm:text-sm">经验优化</TabsTrigger>
          <TabsTrigger value="format" className="rounded-lg py-2 text-xs sm:text-sm">格式</TabsTrigger>
          <TabsTrigger value="content" className="rounded-lg py-2 text-xs sm:text-sm">内容</TabsTrigger>
          <TabsTrigger value="education" className="rounded-lg py-2 text-xs sm:text-sm">教育</TabsTrigger>
        </TabsList>

        {/* Keywords Tab */}
        <TabsContent value="keywords">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                  <p className="text-sm font-medium text-green-700 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> 已包含关键词 ({data.sections.keywords.found.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {data.sections.keywords.found.map(k => (
                      <Badge key={k} variant="outline" className="border-green-300 text-green-700 bg-white">{k}</Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-sm font-medium text-red-700 mb-3 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" /> 建议添加 ({data.sections.keywords.missing.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {data.sections.keywords.missing.map(k => (
                      <Badge key={k} variant="outline" className="border-red-300 text-red-700 bg-white">{k}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-gray-600">行业关键词相关度</div>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${data.sections.keywords.industryRelevance}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-blue-600">{data.sections.keywords.industryRelevance}%</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-3">
                {data.sections.experience.feedback.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="border-t pt-5">
                <p className="text-sm font-medium text-gray-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" /> AI建议的经验描述改写
                </p>
                <div className="space-y-4">
                  {data.sections.experience.impactStatements.map((s, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border">
                      <div className="bg-gray-50 p-4 border-b">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="shrink-0 text-xs">原文</Badge>
                          <p className="text-sm text-gray-500">{s.original}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                        <div className="flex items-start gap-2">
                          <Badge className="bg-green-600 shrink-0 text-xs">优化</Badge>
                          <p className="text-sm font-medium text-gray-800">{s.improved}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Format Tab */}
        <TabsContent value="format">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6 space-y-5">
              <ExpandableSection title="格式评价" defaultOpen>
                <div className="space-y-2 pt-3">
                  {data.sections.format.feedback.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </ExpandableSection>
              <ExpandableSection title="格式优化建议" defaultOpen>
                <div className="space-y-2 pt-3">
                  {data.sections.format.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </ExpandableSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6 space-y-5">
              <ExpandableSection title="内容评价" defaultOpen>
                <div className="space-y-2 pt-3">
                  {data.sections.content.feedback.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </ExpandableSection>
              <ExpandableSection title="内容优化建议" defaultOpen>
                <div className="space-y-2 pt-3">
                  {data.sections.content.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </ExpandableSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-3">
                {data.sections.education.feedback.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <GraduationCap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Tools Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Generate Optimized Resume */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" /> AI 简历优化
            </CardTitle>
            <CardDescription>一键生成优化版简历</CardDescription>
          </CardHeader>
          <CardContent>
            <GenerateResumePanel resumeText={resumeText} analysis={data} />
          </CardContent>
        </Card>

        {/* JD Matching */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" /> JD 匹配分析
            </CardTitle>
            <CardDescription>针对目标岗位定向优化</CardDescription>
          </CardHeader>
          <CardContent>
            <JDAnalysisPanel resumeText={resumeText} />
          </CardContent>
        </Card>
      </div>

      {/* Target Roles + CTA */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" /> 推荐目标职位
          </CardTitle>
          <CardDescription>根据你的背景和技能，我们推荐以下职位方向</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-5">
            {data.targetRoles.map(r => (
              <Badge key={r} className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200 hover:from-purple-200 hover:to-indigo-200 px-3 py-1.5">
                {r}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/jobs">
              <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600">
                查看匹配的H1B职位 <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard/upload">
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" /> 重新上传简历
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Fallback data when no sessionStorage ─────────────────────────────

function getFallbackData(): ResumeAnalysis {
  return {
    overallScore: 72,
    sections: {
      format: {
        score: 78,
        feedback: ['简历长度合适，控制在一页内', '使用了清晰的section分隔', '字体大小不够统一，建议正文统一用10-11pt'],
        suggestions: ['添加LinkedIn链接', '将技能部分移到更显眼的位置', '使用更专业的模板格式']
      },
      content: {
        score: 65,
        feedback: ['缺少量化的工作成果', '技术栈描述不够具体', 'Summary部分过于笼统'],
        suggestions: ['每条经验都加入数字指标', '按STAR法则重写工作经验', '用更有力的Action Verbs开头']
      },
      keywords: {
        found: ['Python', 'React', 'AWS', 'Machine Learning', 'SQL', 'Docker', 'Git'],
        missing: ['CI/CD', 'Agile', 'REST API', 'TypeScript', 'Kubernetes', 'Data Pipeline'],
        industryRelevance: 68
      },
      experience: {
        score: 70,
        feedback: ['实习经历描述偏向任务列表而非成就', '缺少业务影响的量化描述'],
        impactStatements: [
          { original: '负责开发公司内部管理系统', improved: 'Led development of internal management system serving 200+ employees, reducing manual processes by 40%' },
          { original: '参与机器学习模型训练', improved: 'Trained and deployed ML classification model achieving 94% accuracy, processing 10K+ daily predictions in production' },
          { original: '使用React开发前端页面', improved: 'Built 15+ responsive React components with TypeScript, improving page load time by 35% through code splitting' },
        ]
      },
      education: {
        score: 82,
        feedback: ['GPA展示合理', '相关课程列表有帮助', '建议添加相关的学术项目']
      }
    },
    summary: '简历整体结构合理，但在内容深度和关键词覆盖方面有提升空间。最大的改进点是将工作经验从"做了什么"改为"产生了什么影响"。建议重点优化量化指标和技术关键词覆盖率。',
    topImprovements: [
      '将每条工作经验改写为"Action Verb + 量化结果"格式，突出业务影响',
      '补充缺失的关键技术词：CI/CD, Agile, REST API, TypeScript，提升ATS匹配度',
      '在Summary中突出你的独特价值主张和目标职位，展示H1B候选人竞争力'
    ],
    targetRoles: ['Software Engineer', 'Full Stack Developer', 'Data Engineer', 'ML Engineer'],
    atsCompatibility: 71
  };
}
