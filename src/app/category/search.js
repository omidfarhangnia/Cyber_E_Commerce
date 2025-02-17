import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { categories, CategoriesLgDevice, CategoriesSmDevice } from "./page";

export default function SearchSelectedCategory() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);

    if (term !== params.get("selected")) {
      params.set("selected", term);
    } else {
      params.delete("selected");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      {categories.map((category) => {
        return (
          <div key={category.id}>
            <CategoriesSmDevice
              category={category}
              handleSearch={handleSearch}
              searchParams={searchParams}
            />
            <CategoriesLgDevice
              category={category}
              handleSearch={handleSearch}
            />
          </div>
        );
      })}
    </div>
  );
}
