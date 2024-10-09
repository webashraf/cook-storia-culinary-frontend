import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";

import PostComments from "./PostComments";

const PostCardProfile = ({ recipe }: any) => {
  return (
    <>
      <div className="min-h-[400px] min:w-[300px] mx-auto border border-default-300 p-5 rounded-md md:w-full w-full">
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
        <div className="flex flex-col gap-4">
          <div className="space-y-3">
            <div>
              <h3 className="text-xl">{recipe?.title}</h3>
              <p className="text-default-500 text-sm">
                #cuisine - {recipe?.cuisine}
              </p>
              <p className="text-[12px]">{recipe?.shortDescription}</p>
            </div>
            <div className="space-x-2">
              <Chip color="warning" size="sm" variant="bordered">
                <p>Preparation {recipe?.preparationTime}m</p>
              </Chip>
              <Chip color="warning" size="sm" variant="bordered">
                <p>Cooking {recipe?.cookingTime}m</p>
              </Chip>
              <Chip color="warning" size="sm" variant="bordered">
                <p>Servings {recipe?.servings}</p>
              </Chip>
            </div>
            <div className="text-[12px]">
              <p className="text-[13px]">#Nutrition Facts:</p>
              <div className="flex">
                <p className="text-[12px] flex justify-start items-center">
                  <span>calories-</span> {recipe?.nutritionFacts.calories}
                </p>
                <p className="ml-2 text-[12px] flex justify-start items-center">
                  <span>carbohydrates-</span>{" "}
                  {recipe?.nutritionFacts.carbohydrates}
                </p>
                <p className="ml-2 text-[12px] flex justify-start items-center">
                  <span>fat-</span> {recipe?.nutritionFacts.fat}
                </p>
                <p className="ml-2 text-[12px] flex justify-start items-center">
                  <span>protein-</span> {recipe?.nutritionFacts.protein}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[13px]">Your edited instructions:</p>
              <div
                dangerouslySetInnerHTML={{ __html: recipe?.htmlInstructions }}
                className="html-instructions"
              />
            </div>
            <div className="flex items-center w-full justify-between mt-10 gap-5" />
          </div>
          <div className="mt-5 space-y-3">
            <Image
              alt="Recipe Image"
              className="w-full"
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
            userId={recipe?.user?._id}
          />
        </div>
      </div>
    </>
  );
};

export default PostCardProfile;
