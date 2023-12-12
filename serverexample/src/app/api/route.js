import { NextResponse } from "next/server";

import { emojis } from "../lib/emoji";

export function GET() {
  return NextResponse.json({
    success: true,
    emojis,
  });
}