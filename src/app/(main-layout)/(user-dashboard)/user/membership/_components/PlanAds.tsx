"use client";

import { Link } from "@nextui-org/link";

const PlanAds = () => {
  return (
    <div className="min-h-screen p-6 ">
      <h1 className="text-4xl font-bold text-center mb-8">
        Unlock the Full Culinary Experience!
      </h1>
      <p className="text-center text-lg mb-4">
        At <span className="font-bold text-green-500">CookstoriaCulinary</span>,
        we believe in delivering the best culinary content tailored just for
        you.
      </p>
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <p className="text- mb-4">
          Our premium plan opens the door to exclusive recipes, cooking
          techniques, and expert tips that will elevate your culinary skills.
        </p>
        <p className=" mb-4">
          Join our community of culinary enthusiasts and discover:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className=" p-4 rounded-lg shadow-lg shadow-primary-400/50">
          <h2 className="text-xl font-semibold mb-2">Exclusive Recipes</h2>
          <p className="text-">
            Access a vast library of unique recipes curated by top chefs.
          </p>
        </div>
        <div className="p-4 rounded-lg shadow-lg shadow-primary-400/50">
          <h2 className="text-xl font-semibold mb-2">
            In-Depth Cooking Tutorials
          </h2>
          <p className="">
            Learn advanced cooking techniques through our detailed tutorials.
          </p>
        </div>
        <div className="p-4 rounded-lg shadow-lg shadow-primary-400/50">
          <h2 className="text-xl font-semibold mb-2">
            Personalized Meal Plans
          </h2>
          <p className="">
            Get meal plans tailored to your dietary preferences and goals.
          </p>
        </div>
        <div className="p-4 rounded-lg shadow-lg shadow-primary-400/50">
          <h2 className="text-xl font-semibold mb-2">Priority Support</h2>
          <p className="">
            Receive prompt assistance for all your culinary inquiries.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Don’t Miss Out!</h1>
        <p className=" mb-6">
          **Without a premium plan, you wont be able to access detailed content,
          recipes, and tutorials.**
        </p>
        <div className=" w-full flex justify-center items-center">
          <Link href="/user/membership/payment">
            <div className="bg-sky-700 rounded-2xl inline-block shadow-sm shadow-sky-500">
              <div className="group overflow-hidden relative after:duration-500 before:duration-500  duration-500 hover:after:duration-500 hover:after:translate-x-24 hover:before:translate-y-12 hover:before:-translate-x-32 hover:duration-500 after:absolute after:w-24 after:h-24 after:bg-sky-700 after:rounded-full  after:blur-xl after:bottom-32 after:right-16 after:w-12 after:h-12  before:absolute before:w-20 before:h-20 before:bg-sky-400 before:rounded-full  before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12  hover:rotate-12 flex justify-center items-center h-56 w-80 origin-bottom-right bg-neutral-900 rounded-2xl outline outline-slate-400 -outline-offset-8">
                <div className="z-10 flex flex-col items-center gap-2">
                  <span className="text-slate-400 text-xl uppercase font-bold">
                    Hit me👊
                  </span>
                  <span className="text-slate-400 text-6xl font-bold">
                    Premium
                  </span>
                  <p className="text-gray-50">Membership</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanAds;
