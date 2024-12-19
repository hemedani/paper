"use client";
import LoginStepOne from "@/components/organisms/login/LoginStepOne";
import LoginStepTwo from "@/components/organisms/login/LoginStepTwo";
import { useState } from "react";

const Login = ({}) => {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-300">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
            {step === 1
              ? "شماره تماس خود را وارد کنید"
              : "کد ارسال شده را وارد کنید"}
          </h1>
          {step === 1 ? (
            <LoginStepOne setStep={setStep} setPhone={setPhone} phone={phone}/>
          ) : (
            <LoginStepTwo setStep={setStep} phone={phone}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
