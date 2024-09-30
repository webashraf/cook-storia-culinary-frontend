import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";

const PostCard = () => {
  return (
    <div className="h-[400px] border border-default-300 p-5 rounded-md">
      <User
        name="Junior Garcia"
        description={
          <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
            @jrgarciadev
          </Link>
        }
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
        }}
      />
      <div className="h-[100%]">
        <Image
          className="w-full h-[100%]"
          alt="NextUI hero Image with delay"
          src="https://img.freepik.com/free-photo/side-view-pilaf-with-stewed-beef-meat-plate_141793-5057.jpg?t=st=1727686995~exp=1727690595~hmac=7df2c251d1c8d6a1e8986d1a088368ad053160feddf09b896449de00e02b7baf&w=1380"
        />
      </div>
    </div>
  );
};

export default PostCard;
