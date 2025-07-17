import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { articleService } from "@/entities/article/api/article.service";

export async function GET(req: NextRequest) {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "access token не найден, попробуйте еще раз или перезайдите" },
      { status: 401 }
    );
  }

  const query = req.nextUrl.searchParams.toString();
  const data = await articleService.getUnpublishedArticles(query, token);

  return NextResponse.json(data);
}
