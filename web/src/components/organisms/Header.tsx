"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import AdvancedSearch from "../molecules/AdvancedSearch";
import Input from "../atoms/Input";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";

type SearchFormValues = {
  query: string;
};

export const Header: React.FC<{ defaultSearchArrayValues: DefaultSearchArrayValues, pageAddress?: string }> = ({ defaultSearchArrayValues, pageAddress }) => {

  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const router = useRouter();
  const { control, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: {
      query: "",
    },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = async (data) => {
    const { query } = data;
    if (query.trim()) {
      const newRoute = pageAddress ? `${pageAddress}/?search=${query}` : `/?search=${query}`
      router.push(newRoute);
    }
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  return (
    <section className="py-8 px-4">
      <div className="text-center mt-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-black">
          مقالات مرتبط را در یک نمودار بصری کاوش کنید
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-6">
          برای شروع، عنوان مقاله را وارد کنید
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            {!showAdvancedSearch && (
              <>
                <Input
                  name="query"
                  control={control}
                  placeholder="جستجو بر اساس متن عنوان و خلاصه مقاله"
                  className="text-gray-700 rounded-3xl px-4 py-2 w-full md:w-1/3"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-3xl w-full md:w-auto hover:bg-blue-500 transition"
                >
                  جستجو
                </button>
              </>
            )}

            <button
              type="button"
              onClick={toggleAdvancedSearch}
              className={`px-4 py-2 rounded-3xl text-white w-full md:w-auto transition-all ${showAdvancedSearch
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-600 hover:bg-gray-500"
                }`}
            >
              {showAdvancedSearch
                ? "بستن جستجوی پیشرفته"
                : "باز کردن جستجوی پیشرفته"}
            </button>
          </div>
        </form>

        <div
          className={`w-full md:w-4/5 mx-auto mt-6 overflow-hidden transition-all duration-500 ${showAdvancedSearch
            ? "max-h-auto opacity-100"
            : "max-h-0 opacity-0"
            }`}
        >
          <AdvancedSearch defaultSearchArrayValues={defaultSearchArrayValues} isOpen={showAdvancedSearch} pageAddress={pageAddress} />
        </div>
      </div>
    </section>
  );
};
