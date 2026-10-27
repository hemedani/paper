"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const newsletterSchema = z.object({
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface NewsletterSignupProps {
  onSubmit?: (email: string) => Promise<void>;
}

export const NewsletterSignup = ({ onSubmit }: NewsletterSignupProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const handleFormSubmit: SubmitHandler<NewsletterFormValues> = async (data) => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data.email);
      } else {
        // Default behavior - just log for now
        console.log("Newsletter signup:", data.email);
        // TODO: Implement actual newsletter subscription API call
      }
      toast.success("با موفقیت در خبرنامه عضو شدید!");
      reset();
    } catch {
      toast.error("خطا در ثبت ایمیل. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-6" dir="rtl">
      {/* Title and Description */}
      <div className="flex w-full flex-col items-end gap-1">
        <h3 className="text-[22px] font-bold leading-[1.76] text-right text-black lg:text-[28px]">
          خبرنامه پایگاه دانش
        </h3>
        <p className="text-[14px] font-medium leading-[1.76] text-right text-[#9A9AA1] lg:text-[16px]">
          با عضویت در خبرنامه از آخرین اخبار و قوانین ثبت شرکت در کشور های جهان باخبر باشید.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col self-stretch gap-[18px]"
      >
        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <div className="relative flex flex-row items-center self-stretch gap-6 px-[30px] py-[27px] bg-white border border-[#F0F0F2] rounded-[18px] h-[72px]">
            <input
              type="email"
              {...register("email")}
              placeholder="ایمیل خود را وارد کنید"
              disabled={isLoading}
              className="flex-1 text-[16px] font-normal leading-[1.5] text-right text-black placeholder:text-[#9A9AA1] outline-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="w-0 h-[22.5px] border-r border-[#F0F0F2]" />
            <Image
              src="/images/blog/email-icon.svg"
              alt="Email"
              width={24}
              height={24}
              className={isLoading ? "opacity-50" : ""}
            />
          </div>
          {errors.email && <p className="text-sm text-red-500 text-right">{errors.email.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex h-[56px] flex-row items-center justify-center gap-[9px] self-end whitespace-nowrap rounded-[18px] bg-[#08A6AE] px-7 transition-colors hover:bg-[#07959c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="text-[15px] font-semibold leading-[1.76] text-center text-white">
            {isLoading ? "در حال ارسال..." : "ارسال درخواست"}
          </span>
        </button>
      </form>
    </div>
  );
};
