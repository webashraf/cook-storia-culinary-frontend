import { Button } from "@nextui-org/button";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to- from-gray-900 via-gray-800 to-bla min-h-screen py-16">
      <div className="container mx-auto px-6 lg:px-16 text-center">
        <h1 className="text-5xl lg:text-6xl font-extrabold  mb-8">
          Welcome to Cookstoria Culinary
        </h1>
        <p className=" text-default-600 pl-20 mx-auto mb-12">
          Cookstoria Culinary is your ultimate destination for all things
          cooking. Our platform is designed to bring together cooking
          enthusiasts from around the world, creating a space where food lovers
          can share their favorite recipes, discover new dishes, and elevate
          their culinary skills. Whether youre a home cook or a professional
          chef, Cookstoria Culinary is where your passion for food comes alive.
        </p>

        <h2 className="text-4xl font-semibold text-gold-400 mb-6">
          Our Mission
        </h2>
        <p className=" text-default-600 max-w-3xl mx-auto mb-12">
          At Cookstoria Culinary, our mission is to inspire and empower
          individuals to create amazing dishes, share culinary knowledge, and
          foster a global community of food lovers. We believe cooking should be
          accessible, enjoyable, and, most importantly, shared with others. From
          beginner recipes to advanced techniques, we aim to provide a platform
          where everyone can thrive in the kitchen.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className=" rounded-lg p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-3xl text-default-800 font-semibold text-gold-400 mb-4">
              Platform Features
            </h2>
            <ul className="text-default-600 space-y-3">
              <li>
                ✨ Post and explore gourmet recipes with interactive ingredient
                checklists.
              </li>
              <li>
                ⏳ Accurate cooking time estimates for perfectly timed meals.
              </li>
              <li>
                💬 Engage with the community through comments, ratings, and
                social interaction.
              </li>
              <li>
                📊 Upvote and downvote recipes to highlight the best content.
              </li>
              <li>
                👥 Follow your favorite users and chefs, and be part of a
                vibrant cooking community.
              </li>
            </ul>
          </div>

          <div className=" rounded-lg p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-default-800 mb-4">
              Premium Benefits
            </h2>
            <p className="text-default-600 mb-6">
              Enhance your experience by subscribing to our premium service:
            </p>
            <ul className="text-default-600 space-y-3">
              <li>🍽️ Access to exclusive recipes from world-class chefs.</li>
              <li>📅 Advanced meal planning tools and customized menus.</li>
              <li>🚫 An ad-free experience for seamless browsing.</li>
              <li>
                🚀 Early access to upcoming features, events, and cooking
                challenges.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-4xl font-bold text-gold-400 mb-6">
            Meet Our Team
          </h3>
          <p className=" text-default-600 max-w-3xl mx-auto mb-12">
            Cookstoria Culinary is driven by a dedicated team of food
            enthusiasts, professional chefs, and tech innovators. Our team
            shares a common passion for food, creativity, and community,
            striving to provide the best experience for our users. Were
            committed to making Cookstoria Culinary a go-to platform for all
            your culinary needs, constantly innovating and bringing new features
            to help you cook with confidence.
          </p>
          <Button>Join Our Community</Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
