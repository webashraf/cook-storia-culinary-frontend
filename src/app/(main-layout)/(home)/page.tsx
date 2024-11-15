import ReelStories from "../_components/Stories/ReelStories";

export default async function Home() {
  return (
    <section className="flex">
      <div className="w-full mx-auto">
        <ReelStories />
      </div>
    </section>
  );
}
