import { NextRequest, NextResponse } from "next/server";
import { generateResumeWithClaude } from "@/lib/claude";
import type { ResumeAnalysis } from "@/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, analysis } = body as {
      resumeText: string;
      analysis?: ResumeAnalysis;
    };

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "简历文本内容不足，无法生成优化版本" },
        { status: 400 }
      );
    }

    const optimizedResume = await generateResumeWithClaude(resumeText, analysis);
    return NextResponse.json({ optimizedResume });
  } catch (error) {
    console.error("Generate error:", error);
    const message = error instanceof Error ? error.message : "生成优化简历时出错，请重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
