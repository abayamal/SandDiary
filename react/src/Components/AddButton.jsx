import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function AddButton({
  to = "#",
  label = "Add",
  disabled = false,
  loading = false
}) {
  return (
    <Link
      to={disabled || loading ? "#" : to}
      aria-disabled={disabled || loading}
      className={`
        inline-flex items-center gap-2
        rounded-lg
        bg-indigo-600
        px-4 py-2.5
        text-sm font-semibold text-white
        shadow-sm

        transition-all duration-200 ease-in-out

        hover:bg-indigo-500 hover:shadow-md
        active:scale-[0.97] active:bg-indigo-700

        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2

        ${disabled || loading ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
      `}
    >
      {/* icon */}
      {loading ? (
        <svg
          className="h-5 w-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4A10 10 0 002 12h2z"
          />
        </svg>
      ) : (
        <PlusIcon className="h-5 w-5 stroke-[2.5]" />
      )}

      <span>{loading ? "Loading..." : label}</span>
    </Link>
  );
}
