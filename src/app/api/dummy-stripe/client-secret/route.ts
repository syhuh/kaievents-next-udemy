import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // generate a client secret
    const reqBody = await request.json();
    const amount = reqBody.amount;

    const clientSecret = amount;

    return NextResponse.json({ clientSecret: clientSecret });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
