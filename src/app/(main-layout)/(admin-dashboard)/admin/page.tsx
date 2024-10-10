"use client"
import { useUser } from "@/src/context/user.provider";

const AdminDashboard = () => {
  const { user: currentUser } = useUser();

  return (
    <div className="flex h-screen bg-black mt-10">


      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Card */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-white mb-4">Welcome, {currentUser?.name}</h1>
            <p className="text-gray-400">You are logged in as <strong>{currentUser?.role}</strong>.</p>
          </div>

          {/* User Details Card */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-white mb-2">User Details</h2>
            <p className="text-gray-400"><strong>Email:</strong> {currentUser?.email}</p>
            {/* Add more user details as needed */}
          </div>

          {/* Additional Info Card */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-lg font-bold text-white mb-2">Additional Information</h2>
            <p className="text-gray-400">Here you can add more information about the dashboard or stats relevant to the admin.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
