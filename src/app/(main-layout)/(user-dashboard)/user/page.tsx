import ProfileHeader from "./_components/ProfileHeader";
import ProfileInfo from "./_components/ProfileInfo";
import ProfilePosts from "./_components/ProfilePost";

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
