/* eslint-disable prettier/prettier */
import ProfileHeader from "./_components/userHeader";
import ProfileInfo from "./_components/userInfo";
import ProfilePosts from "./_components/userPost";

const ProfilePage = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader />
        <ProfileInfo />
        <ProfilePosts />
      </div>
    </div>
  );
};

export default ProfilePage;
