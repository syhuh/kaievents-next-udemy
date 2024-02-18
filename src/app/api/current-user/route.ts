import { connectDB } from "@/config/dbConfig";
import UserModel from "@/models/user-model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
connectDB();

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("unoautherized request");

    const userInMongoDb = await UserModel.findOne({ clerkUserId: userId });
    return NextResponse.json({ user: userInMongoDb }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/config/dbConfig";
// import UsersModel from "@/models/user-model";
// import { auth } from "@clerk/nextjs";
// connectDB();

// export async function GET(request: NextRequest) {
//   try {
//     const { userId } = auth();
//     console.log("userId:", userId);

//     if (!userId) {
//       throw new Error("Unauthrized request");
//     }

//     const userInMongoDB = await UsersModel.findOne({ clerkUserId: userId });
//     console.log("userInMongoDB:", userInMongoDB);

//     return NextResponse.json({ user: userInMongoDB }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
