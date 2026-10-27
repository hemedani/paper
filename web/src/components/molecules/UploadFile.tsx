import {
  isValidImageExtension,
  isValidPdfExtension,
} from "@/utils/checkFileExtension";
import React, { useState } from "react";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface IUploadImage {
  setUploadedImage: (pic: string) => void;
  token?: string;
  lesanUrl?: string;
  inputName: string;
  type?: "video" | "image" | "doc";
  filePath?: string;
}

export const UploadImage = ({
  token,
  lesanUrl,
  inputName,
  setUploadedImage,
  type,
  filePath,
}: IUploadImage) => {
  const [isUploaded, setIsUploaded] = useState<"uploading" | boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setIsUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploaded("uploading");

    const lesanBody = {
      service: "main",
      model: "file",
      act: "uploadFile",
      details: {
        get: { type: 1, _id: 1 },
        set: type ? { type } : {},
      },
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("lesan-body", JSON.stringify(lesanBody));

    try {
      const response = await fetch(`${lesanUrl}/lesan`, {
        method: "POST",
        body: formData,
        headers: {
          token: token || "",
        },
      });
      const data = await response.json();

      if (data.success) {
        setUploadedImage(data.body._id); // اینجا باید _id برگشتی رو ست کنیم
        setIsUploaded(true);
      } else {
        console.error("Upload failed", data);
        setIsUploaded(false);
      }
    } catch (error) {
      console.error("Error uploading file", error);
      setIsUploaded(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-[16px] border-[1.5px] border-dashed border-[#E4E4E8] bg-[#FBFBFC] p-3">
      <label
        htmlFor={inputName}
        className="flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[12px] bg-white px-4 py-5 text-center transition-colors hover:border-[#08A6AE]/40 hover:bg-[#F8FEFF]"
      >
        <input type="file" id={inputName} hidden onChange={handleFileChange} />
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EDFEFF] text-[#08A6AE]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 16V5m0 0L8 9m4-4l4 4"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M4.5 15.5v2A2.5 2.5 0 007 20h10a2.5 2.5 0 002.5-2.5v-2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-[12px] font-bold text-[#3C3C42]">
          {type === "image" ? "انتخاب تصویر" : type === "doc" ? "انتخاب فایل مقاله" : "انتخاب فایل"}
        </span>
        <span className="text-[10.5px] font-medium text-[#9A9AA1]">
          {type === "image" ? "JPG یا PNG" : "PDF"}
        </span>
      </label>

      {file && file.type === "image/jpeg" ? (
        <div className="h-36 w-full overflow-hidden rounded-[12px] border border-[#F0F0F2]">
          <Image
            className="h-full w-full object-cover"
            src={URL.createObjectURL(file)}
            alt="Uploaded image preview"
            width={400}
            height={160}
          />
        </div>
      ) : file && file.type === "application/pdf" ? (
        <div className="h-36 w-full overflow-hidden rounded-[12px] border border-[#F0F0F2]">
          <embed className="h-full w-full object-cover" src={URL.createObjectURL(file)} />
        </div>
      ) : filePath && isValidImageExtension(filePath) ? (
        <div className="h-36 w-full overflow-hidden rounded-[12px] border border-[#F0F0F2]">
          <Image
            className="h-full w-full object-cover"
            src={`${lesanUrl}/uploads/images/${filePath}`}
            alt="Uploaded image preview"
            width={400}
            height={160}
          />
        </div>
      ) : filePath && isValidPdfExtension(filePath) ? (
        <div className="h-36 w-full overflow-hidden rounded-[12px] border border-[#F0F0F2]">
          <embed className="h-full w-full object-cover" src={`${lesanUrl}/uploads/docs/${filePath}`} />
        </div>
      ) : (
        ""
      )}

      {file && (
        <button
          type="button"
          onClick={handleUpload}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[12px] bg-[#08A6AE] text-[12.5px] font-bold text-white transition-colors hover:bg-[#079aa2] disabled:bg-[#E9F6F7] disabled:text-[#7FBDC1]"
          disabled={isUploaded === "uploading" || isUploaded === true}
        >
          {isUploaded === "uploading"
            ? "در حال بارگذاری…"
            : isUploaded
              ? "بارگذاری شد"
              : "بارگذاری"}
        </button>
      )}
    </div>
  );
};
