import ProfileHeader from "./_components/ProfileHeader";
import ProfileInfo from "./_components/ProfileInfo";
import ProfilePosts from "./_components/ProfilePost";

const ProfilePage = () => {
  return (
    <div className="min-h-screen ">
      <div className=" mx-auto lg:ml-auto">
        <ProfileHeader />
        <ProfileInfo />
        <ProfilePosts />
      </div>
    </div>
  );
};

export default ProfilePage;
