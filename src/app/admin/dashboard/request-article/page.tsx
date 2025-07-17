import { cookies } from "next/headers";

import { RequestArticle } from "@/widgets/admin/request-article/ui/RequestArticle/RequestArticle";
import { articleService } from "@/entities/article/api/article.service";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Запрос статьи",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

const RequestArticlePage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value || "";

  if (!token) redirect("/auth");

  const data = await articleService.getUnpublishedArticles("", token);

  return (
    <>
      <RequestArticle data={data} />
    </>
  );
};

export default RequestArticlePage;
