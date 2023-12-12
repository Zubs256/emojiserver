import { NextResponse } from "next/server.js";

import { emojis } from "@/app/lib/emoji.js";

export function GET(request, response) {
  const { emojiId } = response.params;
  const emoji = emojis.filter((emoji) => emoji.id === +emojiId)[0];
  if (!emoji) {
    return NextResponse.json({
      success: false,
      message: "This is an invalid id",
    });
  }
  return NextResponse.json({
    success: true,
    emoji,
  });
}

export function DELETE(request, response) {
  const { emojiId } = response.params;
  const index = emojis.findIndex((emoji) => +emojiId === emoji.id);
  const deletedEmoji = emojis.splice(index, 1);
  return NextResponse.json({
    success: true,
    deletedEmoji,
    message: " deleting successful",
  });
}

export async function PUT(request, response) {
  try {
    const { emojiId } = response.params;
    console.log(emojis);
    const { name, character } = await request.json();
    const index = emojis.findIndex((emoji) => emoji.id === +emojiId);
    console.log("Index:", index);

    if (index === -1) {
      return NextResponse.json({
        success: false,
        error: "Emoji not found",
      });
    }

    if (!name || !character) {
      return NextResponse.json({
        success: false,
        error: "You must enter a name and character",
      });
    }

    emojis[index].name = name;
    emojis[index].character = character;
    return NextResponse.json({
      success: true,
      emojis,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}