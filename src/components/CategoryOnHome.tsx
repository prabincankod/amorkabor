import { ChevronRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/utils/api";
const CategoryOnHome = () => {
  const category = api.news.getNewsForHome.useQuery();
  console.log(category.data?.data);
  const categoryWithNews = category.data?.data;
  return (
    <>
      {categoryWithNews &&
        categoryWithNews.map((categoryAndNews) => (
          <div className="mx-10">
            <div className="flex flex-row justify-between">
              <div className="lg:4xl mt-2 text-xl font-extrabold text-primary md:text-3xl">
                {categoryAndNews.title}
              </div>
              <div className="lg:4xl mt-2 text-xl  text-primary md:text-3xl ">
                {/* <ChevronRightIcon className="rounded-full bg-primary-foreground p-1" /> */}
                {categoryAndNews.slug}
              </div>
            </div>

            <div className=" mt-2   flex flex-row flex-wrap place-content-center justify-center gap-x-6 gap-y-2 ">
              {categoryAndNews.articles.map((news) => (
                <div className="card rounded-md border bg-accent ">
                  <div className="image  w-52 lg:w-64">
                    <img src={news.image} className=" rounded-md " alt="" />
                  </div>
                  <div className="title  w-52  text-center">{news.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};
export default CategoryOnHome;
