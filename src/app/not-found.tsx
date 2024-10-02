import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          className="inline-block bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
          href="/"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
