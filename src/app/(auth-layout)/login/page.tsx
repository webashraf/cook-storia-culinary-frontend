import Login from "./_components/LoginUser";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen px-5 lg-px-0 ">
      <div
        className="shadow-2xl shadow-[#95c731]/40 bg-cover bg-center rounded-2xl "
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5785545/pexels-photo-5785545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="flex items-center lg:flex-row flex-col lg:justify-around justify-center lg:gap-0 gap-10 size-screen bg-black/80 rounded-xl backdrop-blur-md  p-12 ">
          <div className="lg:w-1/2 text-center">
            <h2 className="lg:text-6xl text-4xl font-semibold mb-4">
              A Recipe Sharing Platform
            </h2>
            <p>
              Share Your Creations, Explore New Recipes, and Inspire Culinary
              Adventures!
            </p>
          </div>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
