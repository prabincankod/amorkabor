import { useRouter } from "next/router";
import { api } from "~/utils/api";

const CategoryDetails = () => {
  const router = useRouter();

  const queryCategory = api.category.getCategoryBySlug.useQuery(
    { slug: router.query.slug as string },
    {
      enabled: router.query.slug ? true : false,
    },
  );

  return (
    <div className="flex flex-col items-center">
      {queryCategory.data?.data?.articles.map((article) => (
        <a key={article.id} href={`/article/${article.slug}`}>
          {article.title}
        </a>
      ))}
    </div>
  );
};

export default CategoryDetails;
