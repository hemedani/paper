import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../atoms/Input";
import SelectBox from "../atoms/Select";
import AsyncSelect from "react-select/async";
import { getTags } from "@/app/actions/tag/getTags";
import { getPublications } from "@/app/actions/publication/getPublications";
import { createArticle } from "@/app/actions/article/createArticle";
import { ReqType } from "@/types/declarations/selectInp";


export type AddUserSet = ReqType["main"]["article"]["addArticle"]["set"];

const ModalForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddUserSet>({
    defaultValues: {
      key: "",
      articleType: "journalArticle",
      authors: [],
      title: "",
      abstract: "",
      ISBN: "",
      ISNN: "",
      DOI: "",
      URL: "",
      page: "",
      issue: 0,
      volume: 0,
      publicationId: "",
      tagIds: [],
    },
  });

  const onSubmit: SubmitHandler<AddUserSet> = async (data) => {
    console.log(data);
    const dataArticle = await createArticle(data)
    setIsOpen(false);
  };

  const loadTagOptions = async (inputValue: string) => {
    const response = await getTags(inputValue);
    console.log("res", response);

    const data = response.map((tag: { _id: string; name: string }) => ({
      value: tag._id,
      label: tag.name,
    }));
    console.log(data);
    return data;
  };

  const handleTagChange = (selectedOptions: any) => {
    const values = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setValue("tagIds", values);
  };

  const loadPublicationOptions = async (inputValue: string) => {
    try {
      const response = await getPublications(inputValue);
      return response.map((publication: { _id: string; title: string }) => ({
        value: publication._id,
        label: publication.title,
      }));
    } catch (error) {
      console.error("Error loading publications:", error);
      return [];
    }
  };

  const handlePublicationChange = (selectedOption: any) => {
    setValue("publicationId", selectedOption ? selectedOption.value : ""); // مقدار انتخاب شده را ذخیره کنید
  };

  return (
    <>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => setIsOpen(true)}
      >
        ایجاد مقاله جدید
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 overflow-y-auto max-h-full">
            <h2 className="text-xl font-semibold mb-4">فرم انتشار</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* فیلدهای دو ستونی */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="tagIds"
                    className="text-sm font-medium text-gray-700"
                  >
                    برچسب‌ها
                  </label>
                  <AsyncSelect
                    isMulti
                    cacheOptions
                    loadOptions={loadTagOptions}
                    defaultOptions
                    onChange={handleTagChange}
                    placeholder="برچسب‌ها را انتخاب کنید"
                    classNamePrefix="react-select"
                  />
                  {errors.tagIds && (
                    <span className="text-red-500 text-xs">
                      {errors.tagIds.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="publicationId"
                    className="text-sm font-medium text-gray-700"
                  >
                    انتشار
                  </label>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadPublicationOptions}
                    defaultOptions
                    onChange={handlePublicationChange}
                    placeholder="انتشار را انتخاب کنید"
                    classNamePrefix="react-select"
                  />
                  {errors.publicationId && (
                    <span className="text-red-500 text-xs">
                      {errors.publicationId.message}
                    </span>
                  )}
                </div>
                <Input
                  label="کلید"
                  placeholder="کلید را وارد کنید"
                  name="key"
                  control={control}
                  rules={{ required: "کلید الزامی است" }}
                />
                <SelectBox
                  label="نوع مقاله"
                  name="articleType"
                  control={control}
                  options={[
                    { value: "journalArticle", label: "مقاله ژورنال" },
                    { value: "book", label: "کتاب" },
                  ]}
                  rules={{ required: "نوع مقاله الزامی است" }}
                />
                <Input
                  label="نویسندگان"
                  placeholder="نویسندگان را با کاما جدا کنید"
                  name="authors"
                  control={control}
                  rules={{ required: "نویسندگان الزامی هستند" }}
                />
                <Input
                  label="عنوان"
                  placeholder="عنوان را وارد کنید"
                  name="title"
                  control={control}
                  rules={{ required: "عنوان الزامی است" }}
                />
                <Input
                  label="چکیده"
                  placeholder="چکیده را وارد کنید"
                  name="abstract"
                  control={control}
                  rules={{ required: "چکیده الزامی است" }}
                />
                <Input
                  label="ISBN"
                  placeholder="ISBN را وارد کنید"
                  name="ISBN"
                  control={control}
                  rules={{ required: "ISBN الزامی است" }}
                />
                <Input
                  label="ISNN"
                  placeholder="ISNN را وارد کنید"
                  name="ISNN"
                  control={control}
                />
                <Input
                  label="DOI"
                  placeholder="DOI را وارد کنید"
                  name="DOI"
                  control={control}
                />
                <Input
                  label="URL"
                  placeholder="URL را وارد کنید"
                  name="URL"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)\/?.*$/,
                      message: "URL نامعتبر است",
                    },
                  }}
                />
                <Input
                  label="صفحات"
                  placeholder="تعداد صفحات را وارد کنید"
                  name="page"
                  control={control}
                />
                <Input
                  label="شماره شماره"
                  placeholder="شماره را وارد کنید"
                  name="issue"
                  control={control}
                  type="number"
                />
                <Input
                  label="جلد"
                  placeholder="جلد را وارد کنید"
                  name="volume"
                  control={control}
                  type="number"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  ارسال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;
