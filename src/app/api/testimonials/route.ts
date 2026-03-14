import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public: get only approved testimonials
export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(testimonials);
}

// Public: submit a new testimonial (goes to PENDING)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, company, description, rating } = body;

    if (!name || !role || !company || !description || !rating) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: { name, role, company, description, rating: Number(rating), status: "PENDING" },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
