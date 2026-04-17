import { NextRequest, NextResponse } from "next/server";
import { analyzeResumeWithJD } from "@/lib/claude";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, jobDescription } = body as {
      resumeText: string;
      jobDescription: string;
    };

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "简历文本内容不足" },
        { status: 400 }
      );
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      return NextResponse.json(
        { error: "请提供完整的职位描述（JD）" },
        { status: 400 }
      );
    }

    const jdAnalysis = await analyzeResumeWithJD(resumeText, jobDescription);
    return NextResponse.json({ jdAnalysis });
  } catch (error) {
    console.error("JD analysis error:", error);
    const message = error instanceof Error ? error.message : "JD分析过程中出错，请重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
