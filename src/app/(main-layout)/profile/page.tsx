/* eslint-disable prettier/prettier */
import ProfileHeader from "./_components/ProfileHeader";
import ProfileInfo from "./_components/ProfileInfo";
import ProfilePosts from "./_components/ProfilePost";

const ProfilePage = () => {
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

export default ProfilePage;
