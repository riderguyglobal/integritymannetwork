import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

// ───────────────────────────────────────
// GET /api/events — Public: list events
// ───────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const upcoming = searchParams.get("upcoming") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: Record<string, unknown> = {};

    if (upcoming) {
      where.startDate = { gte: new Date() };
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          _count: { select: { registrations: true } },
        },
        orderBy: { startDate: upcoming ? "asc" : "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[EVENTS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// ───────────────────────────────────────
// POST /api/events — Admin: create event
// ───────────────────────────────────────

const createEventSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().optional(),
  summary: z.string().optional(),
  coverImage: z.string().url().optional(),
  type: z.enum(["INTEGRITY_SUMMIT", "MENS_RETREAT", "CORPORATE_BREAKFAST", "CORPORATE_LUNCH", "WORKSHOP", "OTHER"]),
  location: z.string().optional(),
  locationUrl: z.string().url().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  capacity: z.number().optional(),
  price: z.number().default(0),
  isFree: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (
      !session?.user ||
      !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = createEventSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;

    const event = await prisma.event.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description || "",
        summary: data.summary,
        coverImage: data.coverImage,
        type: data.type,
        location: data.location,
        locationUrl: data.locationUrl,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        capacity: data.capacity,
        price: data.price,
        isFree: data.isFree,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("[EVENTS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
