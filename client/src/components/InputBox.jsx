import React from "react";

function InputBox({ type = "text", value, onChange, placeholder, min, label }) {
  return (
    <div>
      <label className="text-xs font-medium">{label}</label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        min={min}
        className="w-full py-1 px-2 mb-3 input"
      />
    </div>
  );
}

export default InputBox;
