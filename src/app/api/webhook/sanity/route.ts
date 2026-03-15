import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    // Basic body parsing; for production, you should verify a webhook secret Signature here
    const body = await req.json();

    console.log("Sanity Webhook received:", body._type, body.slug?.current);

    // Global layout components (Navbar/Footer) or HomePage might depend on this content
    revalidatePath("/");

    // Revalidate specific tags based on the Sanity document type modified
    if (body._type === "post") {
      revalidatePath("/blog", "page");
      if (body.slug?.current) {
         revalidatePath(`/blog/${body.slug.current}`, "page");
      }
    } else if (body._type === "category") {
      revalidatePath("/blog", "page");
    }

    return NextResponse.json({ success: true, message: "Cache revalidated" }, { status: 200 });
  } catch (err: any) {
    console.error("Sanity Webhook Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
