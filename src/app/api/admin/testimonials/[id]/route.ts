import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuthorized(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_SECRET;
}

// PATCH: update status (PENDING -> APPROVED, APPROVED -> PENDING, PENDING -> REJECTED, etc.)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();

  if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await prisma.testimonial.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}

// DELETE: remove a testimonial
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.testimonial.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
