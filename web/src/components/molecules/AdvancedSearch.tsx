"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { getTags } from "@/app/actions/tag/getTags";
import { getKeywords } from "@/app/actions/keyword/getKeywords";
import { getAuthors } from "@/app/actions/author/getAuthors";
import MyInput from "../atoms/MyInput";
import MyAsyncMultiSelect from "../atoms/MyAsyncMultiSelect";
import { DeepPartial, ReqType } from "@/types/declarations/selectInp";
import { DefaultSearchArrayValues } from "@/utils/prepareArtticleSearch";

export type AdvencedArticleSearchParams =
  ReqType["main"]["article"]["getArticles"]["set"];

const AdvancedSearch: React.FC<{
  isOpen: boolean;
  defaultSearchArrayValues: DefaultSearchArrayValues;
  pageAddress?: string;
}> = ({
  isOpen,
  defaultSearchArrayValues: { tags, keywords, authors },
  pageAddress,
}) => {
    const router = useRouter();
    const searchParams: DeepPartial<AdvencedArticleSearchParams> = Array.from(
      useSearchParams().entries()
    ).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]:
          key === "tagIds" || key === "keywordIds" || key === "authorIds"
            ? value.split(",")
            : value,
      }),
      {}
    );

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<AdvencedArticleSearchParams>({ defaultValues: searchParams });

    const loadKeywordsOptions = async (keywordName?: string) => {
      const set: ReqType["main"]["keyword"]["getKeywords"]["set"] = {
        limit: 10,
        page: 1,
      };
      if (keywordName) {
        set.name = keywordName;
      }
      const response = await getKeywords({
        set,
        get: { _id: 1, name: 1 },
      });
      return response.map((keyword: { _id: string; name: string }) => ({
        value: keyword._id,
        label: keyword.name,
      }));
    };

    const loadAuthorsOptions = async (authorLastname?: string) => {
      const set: ReqType["main"]["author"]["gets"]["set"] = {
        limit: 10,
        page: 1,
      };
      if (authorLastname) {
        set.last_name = authorLastname;
      }
      const response = await getAuthors({
        set,
        get: { _id: 1, first_name: 1, last_name: 1 },
      });

      return response.map(
        (author: { _id: string; first_name: string; last_name: string }) => ({
          value: author._id,
          label: `${author.first_name} ${author.last_name}`,
        })
      );
    };

    const loadTagOptions = async (tagName?: string) => {
      const set: ReqType["main"]["tag"]["getTags"]["set"] = {
        limit: 10,
        page: 1,
      };
      if (tagName) {
        set.name = tagName;
      }
      const response = await getTags({
        set,
        get: { _id: 1, name: 1 },
      });
      return response.map((tag: { _id: string; name: string }) => ({
        value: tag._id,
        label: tag.name,
      }));
    };

    const onSubmit: SubmitHandler<AdvencedArticleSearchParams> = (criteria) => {
      const queryString = Object.entries(criteria)
        .filter((filterArr) => {
          const value = filterArr[1];
          if (Array.isArray(value)) return value.length > 0;
          return value && value.toString().trim() !== "";
        })
        .map(([key, value]) =>
          Array.isArray(value)
            ? `${encodeURIComponent(key)}=${encodeURIComponent(value.join(","))}`
            : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      const newRoute = pageAddress
        ? `${pageAddress}/?${queryString}`
        : `/?${queryString}`;
      router.push(newRoute);
    };

    return (
      <div
        className={`transition-all duration-500 ease-in-out bg-white border rounded-lg shadow-lg mt-4 min-h-[30rem] ${isOpen ? "max-h-[1000px] opacity-100 p-6" : "max-h-0 opacity-0"
          }`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-100 p-6 border rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800">جستجوی پیشرفته</h3>
          <div className="flex flex-wrap w-full">

            <MyAsyncMultiSelect
              label="برچسب ها"
              setValue={setValue}
              defaultValue={tags}
              name="tagIds"
              defaultOptions
              loadOptions={loadTagOptions}
              errMsg={errors.tagIds?.message}
            />
            <MyAsyncMultiSelect
              label="کلمات کلیدی"
              setValue={setValue}
              defaultValue={keywords}
              name="keywordIds"
              defaultOptions
              loadOptions={loadKeywordsOptions}
              errMsg={errors.keywordIds?.message}
            />
            <MyAsyncMultiSelect
              label="نویسندگان"
              setValue={setValue}
              defaultValue={authors}
              name="authorIds"
              defaultOptions
              loadOptions={loadAuthorsOptions}
              errMsg={errors.authorIds?.message}
            />

            <MyInput name="title" errMsg={errors.title?.message} label="عنوان" placeholder="عنوان مقاله" register={register} />
            <MyInput name="abstract" errMsg={errors.abstract?.message} label="چکیده" placeholder="چکیده مقاله" register={register} />
            <MyInput name="publication" errMsg={errors.publication?.message} label="انتشارات" register={register} />
            <MyInput name="DOI" errMsg={errors.publication?.message} label="DOI" register={register} />
            <MyInput name="ISBN" errMsg={errors.publication?.message} label="ISBN" register={register} />
            <MyInput name="ISNN" errMsg={errors.publication?.message} label="ISNN" register={register} />
            <MyInput name="publicationYear" type="number" errMsg={errors.publicationYear?.message} label="سال انتشار" register={register} />
          </div>

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="px-6 h-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded-md shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              جستجو
            </button>
          </div>
        </form>
      </div>
    );
  };

export default AdvancedSearch;
