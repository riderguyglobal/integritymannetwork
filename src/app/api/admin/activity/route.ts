import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/activity — Recent activity feed for dashboard
export async function GET() {
  try {
    const session = await auth();
    if (
      !session?.user ||
      !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch recent records from multiple tables in parallel
    const [recentUsers, recentPosts, recentOrders, recentDonations, recentMessages, recentRegistrations] =
      await Promise.all([
        prisma.user.findMany({
          select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.blogPost.findMany({
          where: { status: "PUBLISHED" },
          select: {
            id: true,
            title: true,
            publishedAt: true,
          },
          orderBy: { publishedAt: "desc" },
          take: 5,
        }),
        prisma.order.findMany({
          select: {
            id: true,
            orderNumber: true,
            total: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.donation.findMany({
          where: { status: "PAID" },
          select: {
            id: true,
            amount: true,
            anonymous: true,
            createdAt: true,
            user: {
              select: { firstName: true, lastName: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.contactMessage.findMany({
          select: {
            id: true,
            name: true,
            subject: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.eventRegistration.findMany({
          select: {
            id: true,
            createdAt: true,
            event: { select: { title: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
      ]);

    // Merge and sort by date
    type ActivityItem = {
      type: string;
      message: string;
      time: Date;
    };

    const activities: ActivityItem[] = [];

    for (const u of recentUsers) {
      activities.push({
        type: "user",
        message: `New member registration: ${u.firstName} ${u.lastName}`,
        time: u.createdAt,
      });
    }

    for (const p of recentPosts) {
      activities.push({
        type: "blog",
        message: `Blog post published: ${p.title}`,
        time: p.publishedAt || new Date(),
      });
    }

    for (const o of recentOrders) {
      activities.push({
        type: "order",
        message: `New order ${o.orderNumber} — $${Number(o.total).toLocaleString()}`,
        time: o.createdAt,
      });
    }

    for (const d of recentDonations) {
      const donor = d.anonymous
        ? "Anonymous"
        : d.user
        ? `${d.user.firstName} ${d.user.lastName}`
        : "Anonymous";
      activities.push({
        type: "donation",
        message: `Donation received: $${Number(d.amount).toLocaleString()} from ${donor}`,
        time: d.createdAt,
      });
    }

    for (const m of recentMessages) {
      activities.push({
        type: "contact",
        message: `New contact message from ${m.name}${m.subject ? `: ${m.subject}` : ""}`,
        time: m.createdAt,
      });
    }

    for (const r of recentRegistrations) {
      activities.push({
        type: "event",
        message: `New registration for ${r.event.title}`,
        time: r.createdAt,
      });
    }

    // Sort by most recent first, take top 10
    activities.sort((a, b) => b.time.getTime() - a.time.getTime());
    const topActivities = activities.slice(0, 10);

    return NextResponse.json({ activities: topActivities });
  } catch (error) {
    console.error("[ADMIN_ACTIVITY_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    );
  }
}
