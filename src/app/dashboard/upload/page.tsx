"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Upload, FileText, CheckCircle, AlertCircle, Loader2,
  File as FileIcon, X, Sparkles
} from "lucide-react";
import Link from "next/link";

type UploadStage = "idle" | "uploading" | "processing" | "complete" | "error";

const stageConfig: Record<UploadStage, { label: string; color: string }> = {
  idle: { label: "准备上传", color: "text-gray-500" },
  uploading: { label: "上传中...", color: "text-blue-600" },
  processing: { label: "AI 深度分析中...", color: "text-purple-600" },
  complete: { label: "分析完成！", color: "text-green-600" },
  error: { label: "分析失败", color: "text-red-600" },
};

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ACCEPTED_EXTENSIONS = [".pdf", ".docx"];

function isAcceptedFile(file: File): boolean {
  if (ACCEPTED_TYPES.includes(file.type)) return true;
  return ACCEPTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext));
}

function getFileIcon(file: File) {
  if (file.name.endsWith('.pdf')) return <FileText className="w-6 h-6 text-red-500" />;
  return <FileIcon className="w-6 h-6 text-blue-500" />;
}

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<UploadStage>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateAndSetFile = useCallback((selectedFile: File) => {
    setError(null);

    if (!isAcceptedFile(selectedFile)) {
      setError("请上传PDF或DOCX格式的简历");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("文件大小不能超过10MB");
      return;
    }

    setFile(selectedFile);
    setStage("idle");
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setStage("uploading");
    setProgress(10);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      // Progress simulation while waiting for API
      setProgress(20);
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) { clearInterval(progressInterval); return prev; }
          return prev + Math.random() * 8;
        });
      }, 500);

      setStage("processing");

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "分析失败");
      }

      setProgress(100);
      setStage("complete");

      // Store analysis result in sessionStorage for the results page
      sessionStorage.setItem("analysisResult", JSON.stringify(data.analysis));
      sessionStorage.setItem("resumeText", data.resumeText || "");

      // Redirect after short delay
      setTimeout(() => {
        router.push("/dashboard/analysis/latest");
      }, 1200);

    } catch (err) {
      const message = err instanceof Error ? err.message : "上传失败，请稍后重试";
      setError(message);
      setStage("error");
      setProgress(0);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setStage("idle");
    setProgress(0);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">上传简历</h1>
        <p className="text-slate-600 mt-2">
          上传你的简历，AI将进行深度分析并提供针对性的优化建议
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center
          transition-all duration-300 cursor-pointer
          ${isDragOver
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : file
              ? "border-slate-200 bg-white"
              : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/30"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!file ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <Upload className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">
                拖拽简历到此处，或点击选择文件
              </p>
              <p className="text-sm text-slate-500 mt-1">
                支持 PDF、DOCX 格式，最大 10MB
              </p>
            </div>
            <Button
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-shadow"
            >
              选择文件
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border">
                  {getFileIcon(file)}
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900 truncate max-w-xs">{file.name}</p>
                  <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              {stage === "idle" && (
                <button
                  onClick={(e) => { e.stopPropagation(); resetUpload(); }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Progress Section */}
            {stage !== "idle" && stage !== "error" && (
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${stageConfig[stage].color}`}>
                      {stage === "processing" && <Loader2 className="w-3.5 h-3.5 inline mr-1.5 animate-spin" />}
                      {stageConfig[stage].label}
                    </p>
                    <p className="text-sm font-bold text-slate-700">{Math.round(progress)}%</p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 h-full rounded-full transition-all duration-500 ease-out bg-[length:200%_100%] animate-[shimmer_2s_infinite]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Stage Steps */}
                <div className="flex items-center justify-between px-4">
                  {[
                    { key: "uploading", label: "上传", num: 1 },
                    { key: "processing", label: "分析", num: 2 },
                    { key: "complete", label: "完成", num: 3 },
                  ].map((step) => {
                    const isActive = stage === step.key || stage === "complete" ||
                      (stage === "processing" && step.key === "uploading");
                    const isDone = stage === "complete" ||
                      (stage === "processing" && step.key === "uploading");
                    return (
                      <div key={step.key} className="flex items-center gap-2">
                        <div className={`
                          w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all
                          ${isDone ? "bg-green-500 text-white" :
                            isActive ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" :
                            "bg-slate-200 text-slate-500"}
                        `}>
                          {isDone ? "✓" : step.num}
                        </div>
                        <span className={`text-xs font-medium ${isActive ? "text-slate-700" : "text-slate-400"}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {stage === "complete" && (
                  <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-xl py-3">
                    <CheckCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">分析完成，正在跳转到报告页面...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-red-900">{error}</p>
            {stage === "error" && (
              <Button variant="link" className="text-red-700 p-0 h-auto mt-1" onClick={resetUpload}>
                重新上传
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {stage === "idle" && file && (
        <div className="flex gap-3">
          <Button
            onClick={handleUpload}
            className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg transition-shadow text-base"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            开始 AI 分析
          </Button>
          <Link href="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full h-12">返回</Button>
          </Link>
        </div>
      )}

      {stage === "idle" && !file && (
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button variant="outline">返回仪表板</Button>
          </Link>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6">
        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" /> 分析提示
        </h3>
        <ul className="space-y-2.5 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            确保简历包含完整信息（教育背景、工作经历、技能等）
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            支持 PDF 和 Word（.docx）格式，推荐使用PDF获得最佳分析效果
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            AI会检查ATS兼容性、关键词覆盖率和内容质量
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            分析完成后可获取针对性的简历优化建议和一键改写
          </li>
        </ul>
      </div>
    </div>
  );
}
