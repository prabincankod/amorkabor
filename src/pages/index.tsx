import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import TimeAgo from "javascript-time-ago";
import { createServerSideHelpers } from "@trpc/react-query/server";

import { api } from "~/utils/api";
import { HistoryIcon } from "lucide-react";
import en from "javascript-time-ago/locale/en";
import CategoryOnHome from "~/components/CategoryOnHome";
import { useRouter } from "next/router";
import { db } from "~/server/db";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { appRouter } from "~/server/api/root";
import SuperJSON from "superjson";

type PropType = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home(props: PropType) {
  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const newsApi = api.news.getLatestNews.useQuery();
  const latestNews = newsApi.data?.data;
  const router = useRouter();
  return (
    <>
      <Head>
        <title>itnotes.study : coding homework made easy</title>
        <meta name="google-adsense-account" content="ca-pub-8874028213453473" />
        <meta name="description" content="Lessgo and complete this in 2 days" />
        <link rel="icon" href="https://fav.farm/🖥" />
      </Head>
      <div className=" flex flex-col items-center lg:mx-10   ">
        {latestNews &&
          latestNews.map((news) => (
            <div
              key={news.id}
              className=" flex  w-full flex-col border-b py-2 text-center"
            >
              <div
                onClick={() => {
                  router.push(`/article/${news.slug}`);
                }}
                className="lg:5xl mt-2 text-xl font-medium md:text-3xl"
              >
                {news.title}
              </div>
              <div className="flex ">
                <div className="mx-auto flex items-center">
                  <HistoryIcon className="mr-2" />
                  {timeAgo.format(news.createdAt.getTime())}
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <CategoryOnHome /> */}
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      db: db,
    },
    transformer: SuperJSON, // optional - adds superjson serialization
  });
  await helpers.news.getLatestNews.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    revalidate: 10,
  };
}
