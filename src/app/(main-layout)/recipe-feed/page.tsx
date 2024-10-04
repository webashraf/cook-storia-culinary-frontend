"use client";

import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Slider } from "@nextui-org/slider";
import { Controller, useForm } from "react-hook-form";

import CommonHero from "@/src/components/Shared/CommonHero/CommonHero";
import { SearchIcon } from "@/src/components/icons";
import { nexiosInstance } from "@/src/config/axios.instance";
import { useEffect, useState } from "react";
import PostCard from "../_components/PostCard/PostCard";

const RecipeFeed = () => {
  const [querySearchFilter, setQuerySearchFilter] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { handleSubmit: handleSearchSubmit, control: searchControl } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { handleSubmit: handleFilterSubmit, control: filterControl } = useForm({
    defaultValues: {
      cookingTime: 0,
      category: "",
      ingredients: "",
      tags: "",
    },
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      console.log("Hello father mother");
      try {
        const { data }: any = await nexiosInstance.get(
          `/recipe?${querySearchFilter}`
        );

        console.log("recipe data", data);
        setRecipeData(data.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [querySearchFilter]);

  const onSearchSubmit = (data) => {
    const queryString = `searchTerm=${encodeURIComponent(data.search)}`;
    setQuerySearchFilter(queryString);
  };

  const onFilterSubmit = (data) => {
    const queryString = Object.keys(data)
      .filter((key) => data[key] !== "")
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");

    setQuerySearchFilter(queryString);
  };

  return (
    <>
      <div className="lg:ml-10 ml-5">
        <CommonHero title="Recipe Feed" />

        <form onSubmit={handleSearchSubmit(onSearchSubmit)}>
          <div className="py-5">
            <div className="w-52">
              <Controller
                name="search"
                control={searchControl}
                render={({ field }) => (
                  <Input
                    {...field}
                    isClearable
                    placeholder="Type to search..."
                    radius="lg"
                    startContent={
                      <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex lg:flex-row flex-col-reverse gap-5 mt-5">
          <ScrollShadow
            hideScrollBar
            className="ml-auto lg:w-[85%] w-full h-screen"
            offset={0}
            isEnabled={false}
          >
            <div className="grid grid-cols-1 gap-5">
              {recipeData.length === 0 ? (
                <p>No recipes found. Please try different filters.</p>
              ) : (
                recipeData?.map((recipe: any) => (
                  <PostCard key={recipe.title} recipe={recipe} />
                ))
              )}
            </div>
          </ScrollShadow>

          <form
            onSubmit={handleFilterSubmit(onFilterSubmit)}
            className="lg:h-[70vh] bg-default-400/30 lg:w-[30%] rounded-md p-5 space-y-5"
          >
            <h3 className="text-xl underline">Filtering</h3>

            <div>
              <h4 className="capitalize">Filter by cooking time</h4>
              <Controller
                name="cookingTime"
                control={filterControl}
                render={({ field }) => (
                  <Slider
                    {...field}
                    label="Cooking Time"
                    maxValue={60}
                    minValue={0}
                    getValue={(value) => `${value} Minutes`}
                    className="max-w-md"
                  />
                )}
              />
            </div>

            <div>
              <h4 className="capitalize">Filter by categories</h4>
              <Controller
                name="category"
                control={filterControl}
                render={({ field }) => (
                  <RadioGroup {...field} onChange={field.onChange}>
                    <Radio value="buenos-aires">Buenos Aires</Radio>
                    <Radio value="sydney">Sydney</Radio>
                    <Radio value="san-francisco">San Francisco</Radio>
                    <Radio value="london">London</Radio>
                    <Radio value="tokyo">Tokyo</Radio>
                  </RadioGroup>
                )}
              />
            </div>

            <div>
              <h4 className="capitalize">Filter by ingredients</h4>
              <Controller
                name="ingredients"
                control={filterControl}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    orientation="horizontal"
                    onChange={field.onChange}
                  >
                    <Radio value="ingredient1">Ingredient 1</Radio>
                    <Radio value="ingredient2">Ingredient 2</Radio>
                    <Radio value="ingredient3">Ingredient 3</Radio>
                  </RadioGroup>
                )}
              />
            </div>

            <div>
              <h4 className="capitalize">Filter by tags</h4>
              <Controller
                name="tags"
                control={filterControl}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    orientation="horizontal"
                    onChange={field.onChange}
                  >
                    <Radio value="tag1">Tag 1</Radio>
                    <Radio value="tag2">Tag 2</Radio>
                    <Radio value="tag3">Tag 3</Radio>
                  </RadioGroup>
                )}
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecipeFeed;
