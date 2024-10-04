"use client";

import { Input } from "@nextui-org/input";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Controller, useForm } from "react-hook-form";

import CommonHero from "@/src/components/Shared/CommonHero/CommonHero";
import { SearchIcon } from "@/src/components/icons";
import { nexiosInstance } from "@/src/config/axios.instance";
import {
  recipeCategories,
  recipeCuisines,
  recipeTags,
} from "@/src/constent/recipe.constant";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider } from "@nextui-org/slider";
import { useEffect, useState } from "react";
import PostCard from "../_components/PostCard/PostCard";

const RecipeFeed = () => {
  const [querySearchFilter, setQuerySearchFilter] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(false);

  // cuisine, cookingTime, preparationTime,

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

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const { data }: any = await nexiosInstance.get(
          `/recipe?sort=servings&isDeleted=false&status=publish&${querySearchFilter}`
        );
        console.log(
          "query string:",
          `/recipe?sort=servings&isDeleted=false&status=publish&${querySearchFilter}`
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

  const onSearchSubmit = (data: Record<string, any>) => {
    const queryString = `searchTerm=${encodeURIComponent(data.search)}`;
    setQuerySearchFilter(queryString);
  };

  const onFilterSubmit = (data: Record<string, any>) => {
    console.log(data);

    const queryString = Object.keys(data)
      .filter(
        (key) =>
          data[key] !== "" && data[key] !== null && data[key] !== undefined
      )
      .flatMap((key) => {
        const value = data[key];
        if (typeof value === "string" && value.includes(",")) {
          return value
            .split(",")
            .map(
              (val) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(val.trim())}`
            );
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join("&");
    setQuerySearchFilter(queryString);
  };

  const handleClear = () => {
    resetFilter();
    searchReset();
    setQuerySearchFilter("");
  };

  return (
    <>
      <div className="lg:ml-10 ml-5">
        <CommonHero title="Recipe Feed" />

        <form onSubmit={handleSearchSubmit(onSearchSubmit)}>
          <div className="py-5 flex justify-between">
            <div className="w-52 ">
              <Controller
                name="search"
                control={searchControl}
                render={({ field }) => (
                  <Input
                    {...field}
                    isClearable
                    placeholder="Type to search..."
                    radius="lg"
                    className=" "
                    startContent={
                      <Button
                        isIconOnly
                        type="submit"
                        className="relative -left-3"
                      >
                        <SearchIcon className="text-black/50 ml-0  dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 " />
                      </Button>
                    }
                  />
                )}
              />
            </div>
            <Button className="bg-red-500" onClick={() => handleClear()}>
              Clear
            </Button>
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
              {recipeData?.length === 0 ? (
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
            className=" bg-default-400/30 lg:w-[30%] rounded-md p-5 space-y-10"
          >
            <h3 className="text-xl underline">Filtering</h3>

            <div className="space-y-3 w-full">
              <h4 className="capitalize">Filter by time</h4>
              <div className="flex flex-col gap-5">
                {["cookingTime", "preparationTime"].map((item: any) => (
                  <Controller
                    name={item}
                    control={filterControl}
                    render={({ field }) => (
                      <Slider
                        {...field}
                        label={item}
                        showTooltip={true}
                        size="sm"
                        step={5}
                        formatOptions={{ style: "decimal" }}
                        maxValue={60}
                        minValue={0}
                        marks={[
                          {
                            value: 10,
                            label: "10m",
                          },
                          {
                            value: 20,
                            label: "20m",
                          },
                          {
                            value: 30,
                            label: "30m",
                          },
                          {
                            value: 40,
                            label: "40m",
                          },
                          {
                            value: 50,
                            label: "50m",
                          },
                          {
                            value: 60,
                            label: "60m",
                          },
                        ]}
                        defaultValue={0.2}
                        className="max-w-md"
                      />
                    )}
                  />
                ))}
              </div>
            </div>

            <h4 className="capitalize">Other filter options</h4>
            <div className="flex lg:flex-col gap-5">
              <div className="lg:w-full w-[33%]">
                <Controller
                  name="category"
                  control={filterControl}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Filter by category"
                      selectionMode="multiple"
                      className="max-w-xs"
                    >
                      {recipeCategories.map((item) => (
                        <SelectItem key={item}>{item}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>

              <div className="lg:w-full w-[33%]">
                {/* <h4 className="capitalize mb-2">Filter by cuisine</h4> */}
                <Controller
                  name="cuisine"
                  control={filterControl}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={field.onChange}
                      label="Filter by cuisine"
                      selectionMode="multiple"
                      className="max-w-xs"
                    >
                      {recipeCuisines.map((item) => (
                        <SelectItem key={item}>{item}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className="lg:w-full w-[33%]">
                {/* <h4 className="capitalize mb-2">Filter by tags</h4> */}
                <Controller
                  name="tags"
                  control={filterControl}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={field.onChange}
                      label="Filter by tags"
                      selectionMode="multiple"
                      className="max-w-xs"
                    >
                      {recipeTags.map((item) => (
                        <SelectItem key={item}>{item}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="mt-4">
              <Button
                type="submit"
                variant="faded"
                className=" text-white py-2 px-4 rounded-md"
              >
                Apply Filters
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecipeFeed;
