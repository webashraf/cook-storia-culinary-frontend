import Hero from "@/src/components/Home/Hero/Hero";

export default function Home() {
  return (
    <section className=" flex">
      <div className="w-[80%]">
        <Hero />
      </div>
      <div className="w-[20%] h-[120vh] bg-white"></div>
    </section>
  );
}
