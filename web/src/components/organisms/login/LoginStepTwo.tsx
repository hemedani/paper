import React, { Dispatch, SetStateAction, useState } from "react";

type TProps = {
  setStep: Dispatch<SetStateAction<number>>;
  phone: string;
};

const LoginStepTwo = ({ setStep, phone }: TProps) => {
  const [otp, setOtp] = useState("");

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      alert("Login successful!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };
  return (
    <form onSubmit={handleOtpSubmit}>
      <div className="mb-4">
        <div className="flex items-center justify-between py-6">
          <p className="text-gray-500 text-sm text-right">
            کدورود به شماره <span className="text-gray-600">{phone}</span> ارسال
            شده است
          </p>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-blue-500 hover:underline text-sm"
          >
            ویرایش شماره
          </button>
        </div>
        {/* <label
          htmlFor="otp"
          className="block text-sm font-medium text-gray-700"
        >
          کد ارسال شده را وارد کنید
        </label> */}
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="کد 5 رقمی را وارد کنید"
          className="mt-1 text-black w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        تایید و وارد شوید
      </button>
    </form>
  );
};

export default LoginStepTwo;
