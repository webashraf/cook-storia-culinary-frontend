import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { User } from "@nextui-org/user";
import moment from "moment";

import PostCommentsSection from "./PostCommentsSection";

const PostCard = ({ recipe }: any) => {
  return (
    <>
      <div className="min-h-[400px] lg:w-[500px] sm:w-full md:w-[600px]  mx-aut border border-default-300 p-5 rounded-md  shadow-xl shadow-primary-100 overflow-hidden transition ease-in-out duration-300 transform hover:shadow-2xl ">
        <User
          avatarProps={{
            src: recipe?.user?.profilePicture,
          }}
          className="mb-3"
          description={moment(recipe?.createdAt).format("MMM YYYY  h:mm a")}
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
        <div className="flex gap- flex-col w-full">
          <div className="space-y-3 ">
            <div className="">
              <h3 className="text-xl">{recipe?.title}</h3>
              <p className=" text-sm text-[#9acd32]">
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
          <div className=" mt-5 md:w-full w-[100%] space-y-3">
            <Image
              alt="NextUI hero Image with delay"
              className="w-ful"
              height={250}
              isZoomed={true}
              src={recipe?.imageUrl}
              width="100%"
            />
          </div>
          <PostCommentsSection
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
