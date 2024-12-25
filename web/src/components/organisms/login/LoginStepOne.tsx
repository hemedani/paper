import { loginReqAction } from "@/app/actions/loginReq";
import React, { Dispatch, SetStateAction, useState } from "react";

type TProps = {
  setStep: Dispatch<SetStateAction<number>>;
  setPhone: Dispatch<SetStateAction<string>>;
  phone: string;
};

const LoginStepOne = ({ setStep, setPhone, phone }: TProps) => {
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(1);
    
    if (phone.length === 10) {
      loginReqAction({ national_number: phone });
      setStep(2);
    } else {
      // alert("Please enter a valid 10-digit phone number.");
    }
  };
  return (
    <form onSubmit={handlePhoneSubmit}>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          کد ملی{" "}
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="9876543210"
          className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700 placeholder:text-gray-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        ادامه
      </button>
    </form>
  );
};

export default LoginStepOne;
