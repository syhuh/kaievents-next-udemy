import EventModel from "@/models/event-model";
import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getMongoDBUserIdOfLoggedInUser } from "@/actions/users";

connectDB();

export async function PUT(
  request: NextRequest,
  { params }: { params: { eventid: string } }
) {
  try {
    const { userId } = auth();
    console.log("[PUT] userId: ", userId);

    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reqBody = await request.json();

    console.log("[PUT] reqBody: ", reqBody);
    console.log("[PUT] params: ", params);

    await EventModel.findByIdAndUpdate(params.eventid, reqBody);
    return NextResponse.json(
      { message: "Event updated successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { eventid: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await EventModel.findByIdAndDelete(params.eventid);
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
