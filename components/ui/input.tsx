import React, { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  { label?: string; placeholder: string; type: string; name: string }
>(function Input({ label, placeholder, name, type, ...props }, ref) {
  return (
    <div className="my-4">
      {label && (
        <label className="block mb-2 text-base text-gray-900">{label}</label>
      )}
      <input
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white text-base focus:bg-white"
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
