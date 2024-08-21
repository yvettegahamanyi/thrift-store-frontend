import React, { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  { label: string; placeholder: string; type: string; name: string }
>(function Input({ label, placeholder, name, type, ...props }, ref) {
  return (
    <div className="my-4">
      <label className="block mb-2 text-base text-gray-900">{label}</label>
      <input
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:border-gray-300"
        placeholder={placeholder}
        type={type}
        name={name}
        ref={ref} // Forward the ref to the input element
        {...props}
      />
    </div>
  );
});

export default Input;
