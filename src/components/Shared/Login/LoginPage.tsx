import { FaCheckToSlot } from "react-icons/fa6";

import { getAllUser } from "@/src/services/AuthService";
import { getRecipes } from "@/src/services/RecipeService";

import Login from "./LoginUser";

const LoginPage = async () => {
  const recipes = await getRecipes(1, 5);
  const user: any = await getAllUser();

  return (
    <div className="flex items-center justify-center min-h-screen lg:pt-0 pt-10 px-5 lg-px-0 lg:w-[1280px] mx-auto">
      <div
        className="shadow-2xl shadow-[#95c731]/40 bg-cover bg-center rounded-2xl w-full"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5785545/pexels-photo-5785545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="flex items-center lg:flex-row flex-col lg:justify-around justify-center lg:gap-0 gap-10 bg-black/80 rounded-xl backdrop-blur-md  lg:p-12 p-5">
          <div className="lg:w-1/2 text-left">
            <h2 className="lg:text-6xl text-4xl font-semibold mb-4">
              A Recipe Sharing Platform
            </h2>
            <p className="mb-4">
              Share Your Creations, Explore New Recipes, and Inspire Culinary
              Adventures!
            </p>
            <ul className="text-left text-sm">
              <li className="flex items-center gap-2">
                <FaCheckToSlot color="#90bf2f" />
                World class recipe.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckToSlot color="#90bf2f" />
                Accept Credit/Debit Cards various payment.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckToSlot color="#90bf2f" />
                Total
                <span className="text-[#90bf2f] font-semibold">
                  {recipes.premiumRecipe}
                </span>
                premium recipe.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckToSlot color="#90bf2f" />
                Total
                <span className="text-[#90bf2f] font-semibold">
                  {user.PremiumUser}
                </span>
                premium user.
              </li>
              <li className="flex items-center gap-2">
                <FaCheckToSlot color="#90bf2f" />
                Total
                <span className="text-[#90bf2f] font-semibold">
                  {user.dataLength}
                </span>
                active user.
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
