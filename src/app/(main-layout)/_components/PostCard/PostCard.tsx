import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";

import PostComments from "./PostComments";
import { revalidateTag } from "next/cache";

const PostCard = ({ recipe }: any) => {
  revalidateTag("comments");

  return (
    <>
      <div className="min-h-[400px] min:w-[300px]  mx-aut border border-default-300 p-5 rounded-md w-ful">
        <User
          avatarProps={{
            src: recipe?.user?.profilePicture,
          }}
          description={
            <Link isExternal href={`mailto:${recipe?.user?.email}`} size="sm">
              {recipe?.user?._id}
            </Link>
          }
          name={recipe?.user?.username}
        />
        <div className="flex gap- flex-col">
          <div className="space-y-3 ">
            <div className="">
              <h3 className="text-xl">{recipe.title}</h3>
              <p className="text-default-500 text-sm">
                #cuisine - {recipe.cuisine}
              </p>
              <p className="text-[12px]">{recipe.shortDescription}</p>
            </div>
            <div className="space-x-2">
              <Chip color="warning" size="sm" variant="bordered">
                <p className="">Preparation {recipe.preparationTime}m</p>
              </Chip>
              <Chip color="warning" size="sm" variant="bordered">
                <p className="">Cooking {recipe.cookingTime}m</p>
              </Chip>
              <Chip color="warning" size="sm" variant="bordered">
                <p className="">Servings {recipe.servings}</p>
              </Chip>
            </div>
            <div className="text-[12px] ">
              <p className="text-[13px]">#Nutrition Facts:</p>

              <div className="flex ">
                <p className=" text-[12px] flex justify-start items-center">
                  <span className="">calories-</span>{" "}
                  {recipe.nutritionFacts.calories}
                </p>
                <p className="ml-2 text-[12px] flex justify-start items-center">
                  <span className="">carbohydrates-</span>{" "}
                  {recipe.nutritionFacts.carbohydrates}
                </p>
                <p className="ml-2 text-[12px] flex justify-start items-center">
                  <span className="">fat-</span> {recipe.nutritionFacts.fat}
                </p>
                <p className="ml-2 text-[12px] flex justify-start items-center">
                  <span className="">protein-</span>{" "}
                  {recipe.nutritionFacts.protein}
                </p>
              </div>
            </div>

            <div className="flex items-center w-full justify-between mt-10 gap-5" />
          </div>
          <div className=" mt-5  space-y-3">
            <Image
              alt="NextUI hero Image with delay"
              className="w-full "
              height={250}
              isZoomed={true}
              src="https://img.freepik.com/free-photo/side-view-pilaf-with-stewed-beef-meat-plate_141793-5057.jpg?t=st=1727686995~exp=1727690595~hmac=7df2c251d1c8d6a1e8986d1a088368ad053160feddf09b896449de00e02b7baf&w=1380"
              width="100%"
            />
          </div>
          <PostComments postId={recipe._id} userId={recipe?.user?._id} />
        </div>
      </div>
    </>
  );
};

export default PostCard;
