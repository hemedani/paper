"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { UploadImage } from "../molecules/UploadFile";
import Cookies from "js-cookie";
import { updateRelationUser } from "@/app/actions/user/updateRelationUser";
import { ToastNotify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { ReqType, userSchema } from "@/types/declarations/selectInp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const UpdateUserRelationSchema = z.object({
  avatar: z.any().optional(), // برای عکس پروفایل
  nationalCard: z.any().optional(), // برای کارت ملی
});

export type UpdateUserRelationSchemaType = z.infer<typeof UpdateUserRelationSchema>;
export type UpdateUserRelationSet = ReqType["main"]["user"]["updateUserRelations"]["set"]

export const EditUserRelations = ({ _id, lesanUrl, avatar, nationalCard }: userSchema & { lesanUrl: string }) => {
  const { handleSubmit, setValue } = useForm<UpdateUserRelationSet>({
    resolver: zodResolver(UpdateUserRelationSchema),
  });

  const token = Cookies.get("token");
  const router = useRouter();

  const onSubmit: SubmitHandler<UpdateUserRelationSet> = async (formData) => {
    const updatedUserRelations = await updateRelationUser({
      get: { first_name: 1 },
      set: { ...formData, _id: _id! },
    });
    if (updatedUserRelations.success) {
      ToastNotify("success", "با موقیت ویرایش شد");
      router.replace("/admin/users");
    } else {
      ToastNotify("error", "با خطا مواجه شد");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span>عکس پروفایل کاربری</span>
          <UploadImage
            inputName="avatar"
            setUploadedImage={(uploaded: string) => setValue("avatar", uploaded)}
            type="image"
            token={token}
            lesanUrl={lesanUrl}
            filePath={avatar ? avatar.name : undefined}
          />
        </div>
        <div>
          <span>عکس کارت ملی</span>
          <UploadImage
            inputName="nationalCard"
            setUploadedImage={(uploaded: string) => setValue("nationalCard", uploaded)}
            type="image"
            token={token}
            lesanUrl={lesanUrl}
            filePath={nationalCard ? nationalCard.name : undefined}
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
