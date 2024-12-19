import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../molecules/Modal";
import Input from "../atoms/Input";
import { SubmitHandler, useForm } from "react-hook-form";

type TProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

interface FormValues {
  title: string;
  author: string;
  category: string;
  date: string;
}

const ModalArticle = ({ isModalOpen, setIsModalOpen }: TProps) => {
  const { control, handleSubmit } = useForm<FormValues>();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Article created:", formData);
    // setIsModalOpen(false);
    // setFormData({
    //   title: "",
    //   author: "",
    //   category: "",
    //   date: "",
    // });
  };
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h2 className="text-xl text-gray-700 font-bold mb-4">ایجاد مقاله جدید</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          {/* <label className="block text-sm font-medium text-gray-700">
              عنوان
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            /> */}
          <Input
            name="title"
            label="عنوان"
            control={control}
            placeholder="عنوان مقاله..."
            type="text"
            rules={{ required: "عنوان مقاله را وارد کنید" }}
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-sm font-medium text-gray-700">
            نویسنده
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          /> */}
          <Input
            name="author"
            label="نویسنده"
            control={control}
            placeholder="نام نویسنده"
            type="text"
            rules={{ required: "نام نویسنده را وارد کنید" }}
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-sm font-medium text-gray-700">
            دسته‌بندی
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          /> */}
          {/* <Input
            name="author"
            label="نویسنده"
            control={control}
            placeholder="نام نویسنده"
            type="text"
            rules={{ required: "author is required" }}
          /> */}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ذخیره
        </button>
      </form>
    </Modal>
  );
};

export default ModalArticle;
