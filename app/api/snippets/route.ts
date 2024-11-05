import ISnippet from "@/interfaces/models/snippet";
import { connect } from "@/lib/database";
import {
  createSnippet,
  deleteSnippet,
  findAllUserSnippet,
  updateSnippet,
} from "@/service/snippet.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const snippetInfo = (await req.json()) as ISnippet;

    await connect();
    const snippet = await createSnippet(snippetInfo);

    return NextResponse.json({
      message: "Snippet Saved Successfully",
      data: snippet,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const clerkUserId = req.nextUrl.searchParams.get("userId");

    if (!clerkUserId) {
      return NextResponse.json({ error: "Invalid Tag ID" }, { status: 400 });
    }

    await connect();
    const snippets = await findAllUserSnippet(clerkUserId);

    return NextResponse.json({
      message: "Snippets Fetched Successfully",
      data: snippets,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const snippetId = req.nextUrl.searchParams.get("id");
    const snippetInfo = (await req.json()) as ISnippet;

    if (!snippetId) {
      return NextResponse.json(
        { error: "Invalid Snippet ID" },
        { status: 400 }
      );
    }

    await connect();
    const snippet = await updateSnippet(snippetId, snippetInfo);

    return NextResponse.json({
      message: "Snippet Updated Successfully",
      data: snippet,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const snippetId = req.nextUrl.searchParams.get("id");

    if (!snippetId) {
      return NextResponse.json(
        { error: "Invalid Snippet ID" },
        { status: 400 }
      );
    }

    await connect();

    const snippets = await deleteSnippet(snippetId);

    return NextResponse.json({
      message: "Snippet Deleted Successfully",
      data: {},
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}
