import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 });
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Geen toegang" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Bestand te groot (max. 2 MB)" }, { status: 400 });
  }

  const mime = file.type || "application/octet-stream";
  const ext = ALLOWED.get(mime);
  if (!ext) {
    return NextResponse.json({ error: "Bestandstype niet ondersteund" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const name = `${randomUUID()}${ext}`;
  const relDir = path.join("public", "uploads", "questions");
  const absDir = path.join(process.cwd(), relDir);
  await mkdir(absDir, { recursive: true });
  const absPath = path.join(absDir, name);
  await writeFile(absPath, buf);

  const url = `/uploads/questions/${name}`;
  return NextResponse.json({ url });
}
