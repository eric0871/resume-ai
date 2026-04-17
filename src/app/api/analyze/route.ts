import { NextRequest, NextResponse } from "next/server";
import { extractResumeText } from "@/lib/resume-parser";
import { analyzeResume } from "@/lib/claude";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    if (!file)
      return NextResponse.json({ error: "请上传简历文件" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileType = file.type || file.name;
    const text = await extractResumeText(buffer, fileType);

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: "无法从文件中提取足够的文本内容，请检查文件是否有效" },
        { status: 400 }
      );
    }

    const analysis = await analyzeResume(text);
    return NextResponse.json({
      analysis,
      resumeText: text,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    const message = error instanceof Error ? error.message : "分析过程中出错，请重试";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
