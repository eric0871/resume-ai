import { NextRequest, NextResponse } from "next/server";
import { matchJobs } from "@/lib/job-matcher";

export async function GET(req: NextRequest) {
  const roles = req.nextUrl.searchParams.get("roles")?.split(",") || [];
  const skills = req.nextUrl.searchParams.get("skills")?.split(",") || [];
  const jobs = matchJobs(roles, skills);
  return NextResponse.json({ jobs });
}
