import { NextResponse } from "next/server";

import { emojis } from "@/app/lib/emoji";

export function GET(request, response) {
  return NextResponse.json({
    success: true,
    emojis,
  });
}

export async function POST(request, response) {
  try {
    const { name, character } = await request.json();
    if (!name && !character) {
      return NextResponse.json({
        success: false,
        error: "You must enter a name and character",
      });
    }
    const emoji = { id: emojis.length + 1, name, character };
    emojis.push(emoji);
    return NextResponse.json({
      success: true,
      emojis,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
