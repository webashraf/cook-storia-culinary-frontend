import ProfileHeader from "../_components/ProfileHeader";
import ProfilePosts from "../_components/ProfilePost";

type TParams = { params: { profile: string | undefined } };

const page = ({ params }: TParams) => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto lg:ml-auto">
        <ProfileHeader userId={{ id: params.profile }} />
        {/* <ProfileInfo /> */}
        <ProfilePosts userId={{ id: params.profile }} />
      </div>
    </div>
  );
};

export default page;
