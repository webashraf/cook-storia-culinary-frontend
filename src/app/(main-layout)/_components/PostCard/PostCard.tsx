import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";

import PostComments from "./PostComments";

const PostCard = ({ recipe }: any) => {
  return (
    <>
      <div className="min-h-[400px] w-full  mx-aut border border-default-300 p-5 rounded-md md:w-full shadow-xl shadow-primary-100 overflow-hidden hover:shadow-2xl">
        <User
          avatarProps={{
            src: recipe?.user?.profilePicture,
          }}
          className="mb-3"
          description={
            <Link isExternal href={`mailto:${recipe?.user?.email}`} size="sm">
              {recipe?.user?.email}
            </Link>
          }
          name={
            <h4 className="flex gap-1">
              {recipe?.user?.username}
              <span>
                {recipe?.user?.isPremium ? (
                  <p className="text-warning-500">(Pro)</p>
                ) : (
                  ""
                )}
              </span>
            </h4>
          }
        />
        <div className="flex gap- flex-col">
          <div className="space-y-3 ">
            <div className="">
              <h3 className="text-xl">{recipe?.title}</h3>
              <p className="text-default-500 text-sm">
                #cuisine - {recipe?.cuisine}
              </p>
              <p className="text-[12px]">{recipe?.shortDescription}</p>
            </div>
            <div className="space-x-2">
              <Chip color="warning" size="sm" variant="bordered">
                <p className="">Preparation {recipe?.preparationTime}m</p>
              </Chip>
              <Chip color="warning" size="sm" variant="bordered">
                <p className="">Cooking {recipe?.cookingTime}m</p>
              </Chip>
              <Chip color="warning" size="sm" variant="bordered">
                <p className="">Servings {recipe?.servings}</p>
              </Chip>
            </div>
            <div className="text-[12px] ">
              <p className="text-[13px]">#Nutrition Facts:</p>

              <div className="flex ">
                <p className=" text-[12px] flex justify-start items-center">
                  <span className="">calories-</span>{" "}
                  {recipe?.nutritionFacts.calories}
                </p>
                <p className="ml-2 text-[12px] flex justify-start items-center">
                  <span className="">carbohydrates-</span>{" "}
                  {recipe?.nutritionFacts.carbohydrates}
                </p>
                <p className="ml-2 text-[12px] flex justify-start items-center">
                  <span className="">fat-</span> {recipe?.nutritionFacts.fat}
                </p>
                <p className="ml-2 text-[12px] flex justify-start items-center">
                  <span className="">protein-</span>{" "}
                  {recipe?.nutritionFacts.protein}
                </p>
              </div>
            </div>

            <div className="flex items-center w-full justify-between mt-10 gap-5" />
          </div>
          <div className=" mt-5 lg:w-[350px] md:w-[600px] w-[350px] space-y-3">
            <Image
              alt="NextUI hero Image with delay"
              className="w-full "
              height={250}
              isZoomed={true}
              src={recipe?.imageUrl}
              width="100%"
            />
          </div>
          <PostComments
            isPremium={recipe?.isPremium}
            isProUser={recipe?.user?.isPremium}
            postId={recipe?._id}
            recipe={recipe}
            userId={recipe?.user?._id}
          />
        </div>
      </div>
    </>
  );
};

export default PostCard;
