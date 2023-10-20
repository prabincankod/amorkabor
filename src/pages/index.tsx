import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import TimeAgo from "javascript-time-ago";

import { api } from "~/utils/api";
import { HistoryIcon } from "lucide-react";
import en from "javascript-time-ago/locale/en";
export default function Home() {
  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const newsApi = api.news.getLatestNews.useQuery();
  const latestNews = newsApi.data?.data;
  return (
    <>
      <Head>
        <title>AmorKabor: Open Source Alternative to Online Khabar</title>
        <meta name="description" content="Lessgo and complete this in 2 days" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" mx-10 flex flex-col items-center   ">
        {latestNews &&
          latestNews.map((news) => (
            <div
              key={news.id}
              className=" flex  w-full flex-col border-b py-2 text-center"
            >
              <div className="lg:5xl mt-2 text-xl font-medium md:text-3xl">
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
    </>
  );
}
