import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton({
  label = "Back",
  fallback = "/",
  className = "",
  disabled = false
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (disabled) return;

    // if browser has history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // direct visit case
      navigate(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2
        rounded-lg
        border border-gray-300
        bg-white
        px-4 py-2.5
        text-sm font-semibold text-gray-700
        shadow-sm

        transition-all duration-200 ease-in-out

        hover:bg-gray-100 hover:shadow-md
        active:scale-[0.97]

        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2

        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      <ArrowLeftIcon className="h-5 w-5 stroke-[2.5]" />
      {label}
    </button>
  );
}
