// src/App.js
import ProfileHeader from "./components/ProfileHeader";
import ProfileInfo from "./components/ProfileInfo";
import ProfilePosts from "./components/ProfilePost";

const page = () => {
  return (
    <div className="min-h-screen bg-default-100">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader />
        <ProfileInfo />
        <ProfilePosts />
      </div>
    </div>
  );
};

export default page;
