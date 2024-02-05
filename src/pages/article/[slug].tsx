import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Markdown from "react-markdown";

import gfm from "remark-gfm";
import Head from "next/head";

const ArticleDetail = () => {
  const router = useRouter();
  const { data: news, isLoading: isNewsLoading } =
    api.news.getNewsBySlug.useQuery(
      { slug: router.query.slug as string },
      { enabled: router.query.slug ? true : false },
    );

  if (isNewsLoading) {
    return (
      <Loader2 className="mx-[calc(50%)]  my-[calc(10%)] h-40 w-40 animate-spin  items-center" />
    );
  }
  return (
    <>
      <Head>
        <title>{news?.data?.title}</title>
      </Head>
      <Markdown
        remarkPlugins={[gfm]}
        className="prose  m-auto my-4 px-8 sm:my-16"
      >
        {news?.data?.content}
      </Markdown>
    </>
  );
};

export default ArticleDetail;
