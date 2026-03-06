import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const donationSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  currency: z.string().default("NGN"),
  isRecurring: z.boolean().default(false),
  paymentMethod: z.enum(["PAYSTACK", "STRIPE", "PAYPAL"]),
  campaignId: z.string().optional(),
  message: z.string().optional(),
});

// ───────────────────────────────────────
// POST /api/donate — Create donation record
// ───────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = donationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = validation.data;
    const session = await auth();

    const donation = await prisma.donation.create({
      data: {
        amount: data.amount,
        currency: data.currency,
        isRecurring: data.isRecurring,
        paymentMethod: data.paymentMethod,
        message: data.message,
        status: "PENDING",
        ...(session?.user?.id && {
          user: { connect: { id: session.user.id } },
        }),
        ...(data.campaignId && {
          campaign: { connect: { id: data.campaignId } },
        }),
      },
    });

    // TODO: Initialize payment with Paystack/Stripe/PayPal
    // and return the payment URL to the client

    return NextResponse.json(
      {
        message: "Donation initiated",
        donationId: donation.id,
        // paymentUrl: "..." — will be returned after payment gateway integration
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[DONATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to process donation" },
      { status: 500 }
    );
  }
}

// ───────────────────────────────────────
// GET /api/donate — Admin: list donations
// ───────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (
      !session?.user ||
      !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
          campaign: { select: { title: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.donation.count(),
    ]);

    return NextResponse.json({
      donations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[DONATE_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
