import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { api } from "~/utils/api";

const Navbar = () => {
  const categoriesApi = api.category.getCategoryForNav.useQuery();
  const categoriesOnNav = categoriesApi.data?.data;

  return (
    <div className=" flex items-center justify-between bg-primary p-2 pl-12 text-accent">
      <div className=" flex items-center text-lg font-semibold">
        <div className="">Homepage</div>
        <div className="hidden justify-between  lg:flex lg:flex-wrap  ">
          {categoriesApi.status === "success" &&
            categoriesOnNav &&
            categoriesOnNav.map((category) => (
              <div key={category.id} className="ml-4 items-center">
                {category.title}
              </div>
            ))}
        </div>
      </div>
      <div className="sm:visible md:visible lg:hidden  ">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="w-3/6">
            <div className="flex flex-col text-center">
              <div className=" text-2xl font-bold">
                Amor<span className="text-primary">Kabor</span>
              </div>

              {categoriesOnNav &&
                categoriesOnNav.map((category) => (
                  <div key={category.id} className="mt-8 text-xl font-semibold">
                    {category.title}
                  </div>
                ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
export default Navbar;
