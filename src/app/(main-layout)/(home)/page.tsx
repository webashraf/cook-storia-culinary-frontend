import Stories from "../_components/Stories/Stories";

export default async function Home() {
  return (
    <section className="flex">
      <div className="w-full mx-auto">
        <Stories />
      </div>
    </section>
  );
}
