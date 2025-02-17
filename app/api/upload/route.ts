import { ensurePublicBucket, minioClient } from "@/lib/minio";
import { NextRequest, NextResponse } from "next/server";

// Disable Next.js body parsing so we can use formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize bucket with public access
const bucketName = process.env.MINIO_BUCKET || "wishio";

export async function POST(req: NextRequest) {
  try {
    // Ensure bucket exists and is public
    try {
      await ensurePublicBucket(bucketName);
    } catch (error) {
      console.error("Failed to ensure bucket exists:", error);
      return NextResponse.json(
        { error: "Failed to initialize storage bucket" },
        { status: 500 }
      );
    }

    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      const objectName = `${Date.now()}-${file.name}`;

      // Upload file to MinIO
      await minioClient.putObject(bucketName, objectName, buffer, file.size, {
        "Content-Type": file.type,
      });

      // Construct the full URL
      const imageUrl = `${process.env.MINIO_ENDPOINT_URL}/${bucketName}/${objectName}`;

      return NextResponse.json({
        success: true,
        fileName: objectName,
        url: imageUrl,
      });
    } catch (error) {
      console.error("MinIO upload error:", error);
      return NextResponse.json(
        { error: "Failed to upload file to storage" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
