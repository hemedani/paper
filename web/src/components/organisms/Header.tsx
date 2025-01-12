"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import AdvancedSearch from "./AdvancedSearch";
import Input from "../atoms/Input";

type SearchFormValues = {
  query: string;
};

export const Header = () => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const router = useRouter();
  // const pathname = usePathname();
  const { control, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: {
      query: "",
    },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = async (data) => {
    const { query } = data;
    if (query.trim()) {
      router.push(`/?search=${query}`);
    }
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  // const emptyQueryHandler = () => {
  //   router.replace(pathname);
  //   router.refresh();
  // };

  return (
    <section className="py-12">
      <div className="mx-auto text-center mt-10">
        <h1 className="text-4xl font-bold mb-6 text-black text-center">
          مقالات مرتبط را در یک نمودار بصری کاوش کنید
        </h1>
        <p className="text-2xl text-gray-600 m-10">
          برای شروع، عنوان مقاله را وارد کنید
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center items-center gap-2">
            {!showAdvancedSearch && (
              <>
                <Input
                  name="query"
                  control={control}
                  placeholder="جستجو بر اساس متن عنوان و خلاصه مقاله"
                  className="text-gray-700 rounded-3xl px-4 py-2 w-1/3"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-3xl hover:bg-blue-500"
                >
                  جستجو
                </button>
              </>
            )}

            <button
              type="button"
              onClick={toggleAdvancedSearch}
              className={`px-4 py-2 rounded-3xl text-white transition-all ${
                showAdvancedSearch
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            >
              {showAdvancedSearch
                ? "بستن جستجوی پیشرفته"
                : "باز کردن جستجوی پیشرفته"}
            </button>
            {/* <button
              onClick={emptyQueryHandler}
              className="bg-green-500 text-white px-6 py-2 rounded-3xl hover:bg-green-500"
            >
              خالی شدن
            </button> */}
          </div>
        </form>

        <div className="w-2/4 mx-auto">
          <AdvancedSearch isOpen={showAdvancedSearch} />
        </div>
      </div>
    </section>
  );
};
