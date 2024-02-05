import { useRouter } from "next/router";
import { api } from "~/utils/api";

const CategoryList = () => {
  const categoryQuery = api.category.getAllCategories.useQuery();

  const router = useRouter();
  const categories = categoryQuery.data?.data;
  return (
    <div className="mx-20 flex  flex-col items-center">
      {categories?.map((category) => (
        <a href={`/category/${category.slug}`} key={category.id}>
          {category.title}
        </a>
      ))}
    </div>
  );
};

export default CategoryList;
