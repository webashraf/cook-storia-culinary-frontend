"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { SearchIcon } from "@/src/components/icons";
import CommonHero from "@/src/components/Shared/CommonHero/CommonHero";
import CardSkeleton from "@/src/components/Shared/Loader/CardSkeleton";
import nexiosInstance from "@/src/config/nexios.instance";

import PostCard from "../_components/PostCard/PostCard";

import RecipeFilter from "./_components/RecipeFilter";

const RecipeFeed = () => {
  const [hasMore, setHasMore] = useState(true);
  const [querySearchFilter, setQuerySearchFilter] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit: handleSearchSubmit,
    control: searchControl,
    reset: searchReset,
  } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const {
    handleSubmit: handleFilterSubmit,
    control: filterControl,
    reset: resetFilter,
  } = useForm({
    defaultValues: {
      cookingTime: null,
      category: "",
      cuisine: "",
      ingredients: "",
      tags: "",
    },
  });

  const onSearchSubmit = (data: Record<string, any>) => {
    const queryString = `searchTerm=${encodeURIComponent(data.search)}`;

    setQuerySearchFilter(queryString);
  };
  const handleClear = () => {
    resetFilter();
    searchReset();
    setQuerySearchFilter("");
  };
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const { data }: any = await nexiosInstance.get(
        `/recipe?isDeleted=false&status=publish&${querySearchFilter}`
      );

      if (data.success) {
        setRecipeData(data?.data);
      }
      if (data.data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [querySearchFilter]);

  if (!recipeData) {
    return <CardSkeleton count={4} />;
  }

  return (
    <div className="">
      <CommonHero title="Recipe Feed" />

      <div className="lg:px-0 px-5">
        <div className="py-5 flex justify-between flex-wrap gap-5 ">
          <form onSubmit={handleSearchSubmit(onSearchSubmit)}>
            <div className="w-52 ">
              <Controller
                control={searchControl}
                name="search"
                render={({ field }) => (
                  <Input
                    {...field}
                    isClearable
                    className=" "
                    placeholder="Type to search..."
                    radius="lg"
                    startContent={
                      <Button
                        isIconOnly
                        className="relative -left-3"
                        type="submit"
                      >
                        <SearchIcon className="text-black/50 ml-0  dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 " />
                      </Button>
                    }
                  />
                )}
              />
            </div>
          </form>
          <div className="flex gap-2">
            <RecipeFilter
              filterControl={filterControl}
              handleFilterSubmit={handleFilterSubmit}
              setQuerySearchFilter={setQuerySearchFilter}
            />
            <Button className="bg-red-500" onClick={() => handleClear()}>
              Clear
            </Button>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col-reverse gap-5 mt-5">
          <div>
            {recipeData?.map((recipe: any, i) => (
              <PostCard key={recipe._id + i} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeFeed;
