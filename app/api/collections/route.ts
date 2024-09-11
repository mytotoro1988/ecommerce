import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/mongoDb";

import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectToDb();

    const { title, description, image } = await req.json();

    const existingCollection = await Collection.findOne({ title });
    if (existingCollection) {
      return new NextResponse("Collection already Existing", { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse("Title and Image is required", { status: 400 });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    await newCollection.save();

    return new NextResponse(newCollection, { status: 200 });
  } catch (e) {
    console.log(["Collections_POST", e]);

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
export const GET = async (req: NextResponse) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    await connectToDb();

    const collections = await Collection.find().sort({ createdAt: "desc" });

    return NextResponse.json(collections, { status: 200 });
  } catch (e) {
    console.log(["Collections_GET", e]);

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};

export const dynamic = "force-dynamic";
