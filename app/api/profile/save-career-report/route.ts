import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { suggestions, missingSkills, startupIdea } = body;

    if (!suggestions || !Array.isArray(suggestions)) {
      return NextResponse.json(
        { error: "Suggestions are required" },
        { status: 400 }
      );
    }

    // Save career report
    const report = await prisma.careerReport.create({
      data: {
        userId: user.id,
        suggestions: JSON.stringify(suggestions),
        missingSkills: JSON.stringify(missingSkills || []),
        startupIdea: startupIdea ? JSON.stringify(startupIdea) : null,
      },
    });

    return NextResponse.json(
      {
        message: "Career report saved successfully",
        report: {
          id: report.id,
          timestamp: report.timestamp,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Save career report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

