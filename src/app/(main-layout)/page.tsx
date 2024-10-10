"use client";

import { Pagination } from "@nextui-org/pagination";
import { Suspense, useState } from "react";

import Loading from "@/src/components/UI/Loading/Loading";
import { nexiosInstance } from "@/src/config/axios.instance";

import PostCard from "./_components/PostCard/PostCard";
import Stories from "./_components/Stories/Stories";

export default async function Home() {
  const [page, setPage] = useState(1);

  const limit = 4;

  const { data } = await nexiosInstance.get(
    `/recipe?isDeleted=false&status=publish&limit=${limit}&page=${page}`,
    {
      cache: "no-store",
    }
  );
  let recipes: any = [];

  if (data && typeof data === "object" && "data" in data) {
    recipes = data.data;
  }

  return (
    <section className="flex">
      <div className="w-[90%] mx-auto">
        <Stories />
        {/* <RedirectLogin /> */}
        <div className="flex flex-col justify-center">
          <Suspense fallback={<Loading />}>
            <div className="flex gap-5 items-center flex-wrap justify-center">
              {recipes?.map((recipe: any) => (
                <div key={recipe?._id} className="lg:w-[48%]">
                  <PostCard recipe={recipe} />
                </div>
              ))}
            </div>
          </Suspense>
          <Pagination
            isCompact
            showControls
            className="mx-auto mt-5"
            initialPage={1}
            total={limit}
            onChange={(val) => setPage(val)}
          />
        </div>
      </div>
    </section>
  );
}
