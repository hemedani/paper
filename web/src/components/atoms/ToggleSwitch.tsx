import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={`w-11 h-6 rounded-full transition-colors peer-focus-visible:ring-4 peer-focus-visible:ring-[#08A6AE]/20
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                  after:bg-white after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-[#08A6AE]
                  ${disabled ? "opacity-60 cursor-not-allowed" : "bg-[#E4E4E8]"}
                  `}
      ></div>
    </label>
  );
};

export default ToggleSwitch;
