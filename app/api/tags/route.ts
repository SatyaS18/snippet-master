import ITag from "@/interfaces/models/tag";
import { connect } from "@/lib/database";
import {
  createTag,
  deleteTag,
  findAllUserTag,
  updateTag,
} from "@/service/tag.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const tagInfo = (await req.json()) as ITag;

    await connect();
    const tag = await createTag(tagInfo);

    return NextResponse.json({
      message: "Tag Saved Successfully",
      data: tag,
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
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    await connect();
    const tags = await findAllUserTag(clerkUserId);

    return NextResponse.json({
      message: "Tags Fetched Successfully",
      data: tags,
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
    const tagId = req.nextUrl.searchParams.get("id");
    const tagInfo = (await req.json()) as ITag;

    if (!tagId) {
      return NextResponse.json({ error: "Invalid Tag ID" }, { status: 400 });
    }

    await connect();
    const tag = await updateTag(tagId, tagInfo);

    return NextResponse.json({
      message: "Tag Updated Successfully",
      data: tag,
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
    const tagId = req.nextUrl.searchParams.get("id");

    if (!tagId) {
      return NextResponse.json({ error: "Invalid Tag ID" }, { status: 400 });
    }

    await connect();

    const tags = await deleteTag(tagId);

    return NextResponse.json({
      message: "Tag Deleted Successfully",
      data: tags,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}
