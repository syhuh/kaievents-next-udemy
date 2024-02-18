import EventModel from "@/models/event-model";
import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getMongoDBUserIdOfLoggedInUser } from "@/actions/users";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const mongoUserId = await getMongoDBUserIdOfLoggedInUser();
    const reqBody = await request.json();
    reqBody.user = mongoUserId;
    await EventModel.create(reqBody);
    return NextResponse.json(
      { message: "Event created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
