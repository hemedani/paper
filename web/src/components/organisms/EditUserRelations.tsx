"use client";
import { useForm } from "react-hook-form";
import { UploadImage } from "../molecules/UploadFile";
import { useState } from "react";
import Cookies from "js-cookie";
import { updateRelationUser } from "@/app/actions/user/updateRelationUser";
import { ToastNotify } from "@/utils/helper";
import { useRouter } from "next/navigation";

export const EditUserRelations = ({ data, id }: { data: any; id: string }) => {
  const { handleSubmit } = useForm();
  const token = Cookies.get("token");

  const [imageAvatar, setImageAvatar] = useState<string | null>(null);
  const [imageNationalCard, setImageNationalCard] = useState<string | null>(
    null
  );

  const router = useRouter();

  const onSubmit = async () => {
    const data = await updateRelationUser({
      get: { first_name: 1 },
      set: {
        _id: id,
        avatar: imageAvatar as string,
        nationalCard: imageNationalCard as string,
      },
    });
    if (data._id) {
      ToastNotify("success", "با موقیت ویرایش شد");
      router.replace("/admin/users");
    } else {
      ToastNotify("error", "با خطا مواجه شد");
      router.replace("/admin/users");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span>عکس پروفایل کاربری</span>
          <UploadImage
            inputName="avatar"
            setUploadedImage={setImageAvatar}
            type="image"
            token={token}
          />
        </div>
        <div>
          <span>عکس کارت ملی</span>
          <UploadImage
            inputName="nationalCard"
            setUploadedImage={setImageNationalCard}
            type="image"
            token={token}
          />
        </div>
      </div>
      {/* Submit Button */}
      <button className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
        ثبت
      </button>
    </form>
  );
};
