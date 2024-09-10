import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "../../../lib/mongoDb";
import Collection from "@/lib/models/Collection";

const POST = async (req: NextRequest) => {
  const { userId } = auth();
  try {
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

    const newCollection = await Collection.createIndex({
      title,
      description,
      image,
    });
  } catch (e) {
    console.log(["Collections_POST", e]);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
