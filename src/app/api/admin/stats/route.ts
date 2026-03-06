import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/stats — Dashboard statistics
export async function GET() {
  try {
    const session = await auth();
    if (
      !session?.user ||
      !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Run all queries in parallel for speed
    const [
      totalUsers,
      usersThisMonth,
      usersLastMonth,
      totalPosts,
      publishedPosts,
      totalEvents,
      upcomingEvents,
      totalProducts,
      activeProducts,
      totalOrders,
      ordersThisMonth,
      ordersLastMonth,
      totalDonations,
      donationsThisMonth,
      donationsLastMonth,
      totalMessages,
      unreadMessages,
      revenueResult,
      revenueLastMonthResult,
      donationSumResult,
      donationSumLastMonthResult,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.user.count({
        where: {
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.event.count(),
      prisma.event.count({ where: { startDate: { gte: now } } }),
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.order.count({
        where: {
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
      prisma.donation.count(),
      prisma.donation.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.donation.count({
        where: {
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: "PAID", createdAt: { gte: startOfMonth } },
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: {
          paymentStatus: "PAID",
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
      prisma.donation.aggregate({
        _sum: { amount: true },
        where: { status: "PAID", createdAt: { gte: startOfMonth } },
      }),
      prisma.donation.aggregate({
        _sum: { amount: true },
        where: {
          status: "PAID",
          createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),
    ]);

    const calcChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    return NextResponse.json({
      users: {
        total: totalUsers,
        thisMonth: usersThisMonth,
        change: calcChange(usersThisMonth, usersLastMonth),
      },
      blog: {
        total: totalPosts,
        published: publishedPosts,
      },
      events: {
        total: totalEvents,
        upcoming: upcomingEvents,
      },
      products: {
        total: totalProducts,
        active: activeProducts,
      },
      orders: {
        total: totalOrders,
        thisMonth: ordersThisMonth,
        change: calcChange(ordersThisMonth, ordersLastMonth),
      },
      donations: {
        total: totalDonations,
        thisMonth: donationsThisMonth,
        change: calcChange(donationsThisMonth, donationsLastMonth),
      },
      messages: {
        total: totalMessages,
        unread: unreadMessages,
      },
      revenue: {
        thisMonth: Number(revenueResult._sum.total || 0),
        lastMonth: Number(revenueLastMonthResult._sum.total || 0),
        change: calcChange(
          Number(revenueResult._sum.total || 0),
          Number(revenueLastMonthResult._sum.total || 0)
        ),
      },
      donationSum: {
        thisMonth: Number(donationSumResult._sum.amount || 0),
        lastMonth: Number(donationSumLastMonthResult._sum.amount || 0),
        change: calcChange(
          Number(donationSumResult._sum.amount || 0),
          Number(donationSumLastMonthResult._sum.amount || 0)
        ),
      },
    });
  } catch (error) {
    console.error("[ADMIN_STATS_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
