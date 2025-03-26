"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { categorySchema } from "@/types/declarations/selectInp";
import { SearchIcon, FilterIcon } from "@/components/atoms/Icons";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFilterSchema = z.object({
  search: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

type SearchFilterFormValues = z.infer<typeof searchFilterSchema>;

interface BlogSearchFilterProps {
  categories: categorySchema[];
  pageAddress: string;
}

export const BlogSearchFilter = ({
  categories,
  pageAddress,
}: BlogSearchFilterProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SearchFilterFormValues>({
    resolver: zodResolver(searchFilterSchema),
  });

  const selectedCategories = watch("categories") || [];

  const onSubmit: SubmitHandler<SearchFilterFormValues> = (data) => {
    const searchParams = new URLSearchParams();

    if (data.search?.trim()) {
      searchParams.append("search", data.search.trim());
    }

    if (data.categories?.length) {
      searchParams.append("categories", data.categories.join(","));
    }

    const queryString = searchParams.toString();
    const newRoute = pageAddress
      ? `${pageAddress}${queryString ? `?${queryString}` : ""}`
      : `/${queryString ? `?${queryString}` : ""}`;

    router.push(newRoute);
  };

  const toggleCategory = (categoryId: string) => {
    const currentCategories = selectedCategories;
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];

    setValue("categories", newCategories);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-sm p-6 mb-8"
    >
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          {...register("search")}
          placeholder="جستجو در مقالات..."
          className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          دسته‌بندی‌ها
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category._id}
              type="button"
              onClick={() => toggleCategory(category._id!)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategories.includes(category._id!)
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FilterIcon className="w-5 h-5 ml-2" />
          {isSubmitting ? "در حال جستجو..." : "جستجو"}
        </button>
      </div>
    </form>
  );
};
