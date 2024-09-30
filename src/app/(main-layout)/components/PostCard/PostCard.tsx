import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";

const recipes = [
  {
    title: "Chicken Alfredo",
    user: "123abc456def789ghi",
    ingredients: [
      "fettuccine pasta",
      "chicken breast",
      "heavy cream",
      "Parmesan cheese",
      "butter",
      "garlic",
      "black pepper",
    ],
    instructions:
      "1. Cook fettuccine according to package instructions.\n2. In a pan, cook chicken until browned.\n3. In another pan, melt butter and sauté garlic.\n4. Add cream and Parmesan to the garlic, stirring until thickened.\n5. Combine pasta, chicken, and sauce, mixing well. Serve with pepper.",
    preparationTime: 15,
    cookingTime: 25,
    servings: 4,
    cuisine: "Italian",
    dietaryRestrictions: ["gluten-free"],
    imageUrl: "https://example.com/chicken-alfredo.jpg",
    nutritionFacts: {
      calories: 700,
      protein: 35,
      fat: 40,
      carbohydrates: 50,
    },
    shortDescription:
      "A creamy and delicious Italian pasta dish made with tender chicken, fettuccine, and rich Alfredo sauce.",
  },
  {
    title: "Vegetable Stir Fry",
    user: "987zyx654wvu321tsp",
    ingredients: [
      "broccoli",
      "carrots",
      "bell peppers",
      "soy sauce",
      "ginger",
      "garlic",
      "olive oil",
    ],
    instructions:
      "1. Heat olive oil in a wok.\n2. Add garlic and ginger, sauté for 1 minute.\n3. Add vegetables and stir-fry until tender.\n4. Pour soy sauce over vegetables and stir until evenly coated. Serve hot.",
    preparationTime: 10,
    cookingTime: 10,
    servings: 3,
    cuisine: "Asian",
    dietaryRestrictions: ["vegan", "gluten-free"],
    imageUrl: "https://example.com/vegetable-stir-fry.jpg",
    nutritionFacts: {
      calories: 250,
      protein: 8,
      fat: 12,
      carbohydrates: 30,
    },
    shortDescription:
      "A healthy and quick vegetable stir fry packed with fresh flavors of ginger, garlic, and soy sauce.",
  },
  {
    title: "Beef Tacos",
    user: "abc987654lmn321hgf",
    ingredients: [
      "ground beef",
      "taco seasoning",
      "tortillas",
      "lettuce",
      "cheddar cheese",
      "tomato",
      "sour cream",
    ],
    instructions:
      "1. Cook beef in a pan with taco seasoning.\n2. Warm tortillas in a separate pan.\n3. Assemble tacos with beef, lettuce, cheese, tomato, and sour cream. Serve immediately.",
    preparationTime: 5,
    cookingTime: 15,
    servings: 4,
    cuisine: "Mexican",
    dietaryRestrictions: ["gluten-free"],
    imageUrl: "https://example.com/beef-tacos.jpg",
    nutritionFacts: {
      calories: 400,
      protein: 20,
      fat: 25,
      carbohydrates: 35,
    },
    shortDescription:
      "Classic Mexican beef tacos served with fresh toppings, perfect for a quick and flavorful meal.",
  },
];

const PostCard = () => {
  return (
    <div className="gri grid-cols-2 gap-5 space-y-5">
      {recipes?.map((recipe) => (
        <div className="h-[400px mx-auto border border-default-300 p-5 rounded-md">
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
                  <p className="capitalize">
                    Preparation Time {recipe.preparationTime}
                  </p>
                </Chip>
                <Chip size="sm" color="warning" variant="bordered">
                  <p className="capitalize">
                    Cooking Time {recipe.cookingTime}
                  </p>
                </Chip>
                <Chip size="sm" color="warning" variant="bordered">
                  <p className="capitalize">Servings {recipe.servings}</p>
                </Chip>
              </div>
              <Button variant="faded" size="sm">
                View Full Recipe
              </Button>
              <div className="flex items-center w-full justify-between mt-10 gap-5">
                <div className="flex justify-between bg-default-40 gap-2  py-2  rounded-xl">
                  <Button size="sm" className="text-sm flex w-[50%] gap-1">
                    <AiOutlineLike size={18} />
                    <span className="text-[12px]">2</span>
                  </Button>

                  <Button size="sm" className="text-sm flex w-[50%] gap-1">
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
      ))}
    </div>
  );
};

export default PostCard;
