import Image from "next/image";
import Container from "../../UI/Container";

const Hero = () => {
  return (
    <div
      className="relative h-[90vh] w-full "
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/20157703/pexels-photo-20157703/free-photo-of-tree-branches-with-pink-blossoms.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" bg-black/50 h-full w-full backdrop-blur-3xl">
        <Container>
          <div className=" flex flex-col lg:flex-row items-center justify-between">
            {/* Left Side - Text Content */}
            <div className="h-full w-full lg:w-2/3 flex flex-col justify-center p-8 lg:p-16 text-left">
              <h1 className="text-white text-5xl lg:text-6xl font-bold uppercase mb-4">
                Welcome to Our Business
              </h1>
              <h2 className="text-white text-3xl lg:text-4xl font-medium mb-6">
                Transforming Ideas into Reality
              </h2>
              <p className="text-white text-lg lg:text-xl mb-8 leading-relaxed">
                We specialize in providing innovative solutions tailored to your
                business needs. Let's work together to drive your business
                forward with our expertise and commitment to excellence.
              </p>

              {/* Buttons */}
              <div className="space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#services"
                  className="inline-block bg-white text-gray-800 px-8 py-3 rounded-full shadow-lg hover:bg-gray-300 transition-transform duration-300 ease-in-out"
                >
                  Learn More
                </a>
                <a
                  href="#contact"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-full shadow-lg hover:bg-white hover:text-black transition-transform duration-300 ease-in-out"
                >
                  Get in Touch
                </a>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-[70vh] overflow-hidden w-full lg:w-1/3 rounded-md">
              <Image
                src="https://images.pexels.com/photos/20157703/pexels-photo-20157703/free-photo-of-tree-branches-with-pink-blossoms.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Business visual"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </Container>
      </div>

      <></>
    </div>
  );
};

export default Hero;

{
  /* <Container>
          <div className="h-[90vh] w-full flex flex-col lg:flex-row items-center justify-between">
            {/* Left Side - Text Content */
}
// <div className="h-full w-full lg:w-2/3 flex flex-col justify-center p-8 lg:p-16 text-left">
//   <h1 className="text-white text-5xl lg:text-6xl font-bold uppercase mb-4">
//     Welcome to Our Business
//   </h1>
//   <h2 className="text-white text-3xl lg:text-4xl font-medium mb-6">
//     Transforming Ideas into Reality
//   </h2>
//   <p className="text-white text-lg lg:text-xl mb-8 leading-relaxed">
//     We specialize in providing innovative solutions tailored to your
//     business needs. Let's work together to drive your business
//     forward with our expertise and commitment to excellence.
//   </p>

{
  /* Buttons */
}
//   <div className="space-y-4 sm:space-y-0 sm:space-x-4">
//     <a
//       href="#services"
//       className="inline-block bg-white text-gray-800 px-8 py-3 rounded-full shadow-lg hover:bg-gray-300 transition-transform duration-300 ease-in-out"
//     >
//       Learn More
//     </a>
//     <a
//       href="#contact"
//       className="inline-block border-2 border-white text-white px-8 py-3 rounded-full shadow-lg hover:bg-white hover:text-black transition-transform duration-300 ease-in-out"
//     >
//       Get in Touch
//     </a>
//   </div>
// </div>

{
  /* Right Side - Image */
}
// <div className="relative h-[70vh] overflow-hidden w-full lg:w-1/3">
{
  /* <Image
                src="https://images.pexels.com/photos/20157703/pexels-photo-20157703/free-photo-of-tree-branches-with-pink-blossoms.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Business visual"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </Container> */
}
