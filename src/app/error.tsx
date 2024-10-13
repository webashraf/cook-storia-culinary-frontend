"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <button
        className="inline-block bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
