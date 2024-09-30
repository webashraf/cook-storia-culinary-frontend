import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";

const PostCard = ({ recipe }: any) => {
  return (
    <>
      <div className="min-h-[400px]  mx-auto border border-default-300 p-5 rounded-md w-full">
        <div className="flex gap-5">
          <div className=" mt-5 w-[50%] space-y-3">
            <User
              name="Junior Garcia"
              description={
                <Link
                  href="https://twitter.com/jrgarciadev"
                  size="sm"
                  isExternal
                >
                  @jrgarciadev
                </Link>
              }
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
            />
            <Image
              width={"100%"}
              height={250}
              isZoomed={true}
              className="w-full "
              alt="NextUI hero Image with delay"
              src="https://img.freepik.com/free-photo/side-view-pilaf-with-stewed-beef-meat-plate_141793-5057.jpg?t=st=1727686995~exp=1727690595~hmac=7df2c251d1c8d6a1e8986d1a088368ad053160feddf09b896449de00e02b7baf&w=1380"
            />
          </div>
          <div className="space-y-3 w-[50%]">
            <div className="">
              <h3 className="text-xl">{recipe.title}</h3>
              <p className="text-default-500 text-sm">
                #cuisine - {recipe.cuisine}
              </p>
              <p className="text-[12px]">{recipe.shortDescription}</p>
            </div>
            <div>
              <h4>#Nutrition Facts</h4>
              <p className="ml-2 text-[12px]">
                <span className="">calories</span> :{" "}
                {recipe.nutritionFacts.calories}
              </p>
              <p className="ml-2 text-[12px]">
                <span className="">carbohydrates</span> :{" "}
                {recipe.nutritionFacts.carbohydrates}
              </p>
              <p className="ml-2 text-[12px]">
                <span className="">fat</span> : {recipe.nutritionFacts.fat}
              </p>
              <p className="ml-2 text-[12px]">
                <span className="">protein</span> :{" "}
                {recipe.nutritionFacts.protein}
              </p>
            </div>
            <div className="space-x-2">
              <Chip size="sm" color="warning" variant="bordered">
                <p className="">Preparation {recipe.preparationTime}m</p>
              </Chip>
              <Chip size="sm" color="warning" variant="bordered">
                <p className="">Cooking {recipe.cookingTime}m</p>
              </Chip>
              <Chip size="sm" color="warning" variant="bordered">
                <p className="">Servings {recipe.servings}</p>
              </Chip>
            </div>
            <Button variant="faded" size="sm">
              View Full Recipe
            </Button>
            <div className="flex items-center w-full justify-between mt-10 gap-5">
              <div className="flex justify-between bg-default-40 gap-2  py-2  rounded-xl">
                <Button
                  isIconOnly={true}
                  size="sm"
                  className="text-sm flex w-[50%] gap-1"
                >
                  <AiOutlineLike size={18} />
                  <span className="text-[12px]">2</span>
                </Button>

                <Button
                  isIconOnly={true}
                  size="sm"
                  className="text-sm flex w-[50%] gap-1"
                >
                  <AiOutlineDislike size={18} />
                  <span className="text-[12px]">2</span>
                </Button>
              </div>
              <div className="flex bg-whit w-full gap-2">
                <Input
                  // key={placement}
                  type="text"
                  // size=""
                  width={"100%"}
                  className="w-[100%]"
                  placeholder="Drop your comment"
                />
                <Button className="p-1">
                  <IoPaperPlaneOutline size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
