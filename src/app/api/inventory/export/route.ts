import { API_BASE_URL } from "@/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    const backendRes = await fetch(`${API_BASE_URL}/v1/items/export`, {
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: "Failed to export inventory" },
        { status: backendRes.status },
      );
    }

    // Pass through the response headers (content-type, content-disposition)
    const headers = new Headers(backendRes.headers);

    // Ensure we send back the correct content type for download
    // headers.set("Content-Disposition", 'attachment; filename="inventory.xlsx"'); // Backend usually sets this

    return new NextResponse(backendRes.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("EXPORT Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
