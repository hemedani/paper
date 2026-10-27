"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { updateRelationUser } from "@/app/actions/user/updateRelationUser";
import { ToastNotify } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { ReqType, userSchema } from "@/types/declarations/selectInp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadImage } from "@/components/molecules/UploadFile";
import {
  AdminIcon,
  AdminPanel,
  btn,
  formFooter,
  formGrid,
} from "../admin/AdminUI";

export const UpdateUserRelationSchema = z.object({
  avatar: z.any().optional(), // برای عکس پروفایل
  nationalCard: z.any().optional(), // برای کارت ملی
});

export type UpdateUserRelationSchemaType = z.infer<typeof UpdateUserRelationSchema>;
export type UpdateUserRelationSet = ReqType["main"]["user"]["updateUserRelations"]["set"]

export const EditUserRelations = ({ _id, lesanUrl, avatar, nationalCard, isOwn }: userSchema & { lesanUrl: string, isOwn?: boolean }) => {
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
      router.replace(isOwn ? "/user" : "/admin/users");
    } else {
      ToastNotify("error", "با خطا مواجه شد");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <AdminPanel title="تصاویر کاربر" icon={AdminIcon.image} bodyClassName="p-5">
        <div className={formGrid}>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#5C5C63]">عکس پروفایل کاربری</span>
            <UploadImage
              inputName="avatar"
              setUploadedImage={(uploaded: string) => setValue("avatar", uploaded)}
              type="image"
              token={token}
              lesanUrl={lesanUrl}
              filePath={avatar ? avatar.name : undefined}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-bold text-[#5C5C63]">عکس کارت ملی</span>
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
      </AdminPanel>

      <div className={formFooter}>
        <button
          type="button"
          onClick={() => router.push(isOwn ? "/user" : "/admin/users")}
          className={btn.secondary}
        >
          انصراف
        </button>
        <button type="submit" className={btn.primary}>
          {AdminIcon.save}
          ذخیره تغییرات
        </button>
      </div>
    </form>
  );
};
