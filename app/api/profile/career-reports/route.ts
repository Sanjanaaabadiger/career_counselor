import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const reports = await prisma.careerReport.findMany({
      where: { userId: user.id },
      orderBy: { timestamp: "desc" },
      select: {
        id: true,
        suggestions: true,
        missingSkills: true,
        startupIdea: true,
        timestamp: true,
      },
    });

    return NextResponse.json({
      reports: reports.map((report: {
        id: string;
        suggestions: string;
        missingSkills: string;
        startupIdea: string | null;
        timestamp: Date;
      }) => ({
        id: report.id,
        suggestions: JSON.parse(report.suggestions),
        missingSkills: JSON.parse(report.missingSkills),
        startupIdea: report.startupIdea ? JSON.parse(report.startupIdea) : null,
        timestamp: report.timestamp,
      })),
    });
  } catch (error) {
    console.error("Get career reports error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

