import Modal from "../molecules/Modal";
import Input from "../atoms/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { createTag } from "@/app/actions/tag/createTag";

type TProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface FormValues {
  title: string;
}

const ModalPoplication = ({ isModalOpen, setIsModalOpen }: TProps) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { title: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Article created:", data.title);
    const dataTag =  await createTag(data.title)
    console.log(dataTag);
    
    // بستن مودال و پاکسازی فرم
    // setIsModalOpen(false);
    reset();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <h2 className="text-xl text-gray-700 font-bold mb-4">ایجاد مقاله جدید</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            name="title"
            label="عنوان"
            control={control}
            placeholder="عنوان مقاله..."
            type="text"
            rules={{ required: "عنوان مقاله را وارد کنید" }}
          />
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

export default ModalPoplication;
