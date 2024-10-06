"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider } from "@nextui-org/slider";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { SearchIcon } from "@/src/components/icons";
import CommonHero from "@/src/components/Shared/CommonHero/CommonHero";
import Loading from "@/src/components/UI/Loading/Loading";
import { nexiosInstance } from "@/src/config/axios.instance";
import {
  recipeCategories,
  recipeCuisines,
  recipeTags,
} from "@/src/constent/recipe.constant";

import PostCard from "../_components/PostCard/PostCard";

const RecipeFeed = () => {
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

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const { data }: any = await nexiosInstance.get(
          `/recipe?sort=servings&isDeleted=false&status=publish&${querySearchFilter}`
        );

        setRecipeData(data.data);
      } catch (error) {
        console.log(error);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="lg:ml-10 ml-5">
        <CommonHero title="Recipe Feed" />

        <form onSubmit={handleSearchSubmit(onSearchSubmit)}>
          <div className="py-5 flex justify-between">
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
            <Button className="bg-red-500" onClick={() => handleClear()}>
              Clear
            </Button>
          </div>
        </form>

        <div className="flex lg:flex-row flex-col-reverse gap-5 mt-5">
          <ScrollShadow
            hideScrollBar
            className="ml-auto lg:w-[85%] w-full h-screen"
            isEnabled={false}
            offset={0}
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
            className=" bg-default-400/30 lg:w-[30%] rounded-md p-5 space-y-10"
            onSubmit={handleFilterSubmit(onFilterSubmit)}
          >
            <h3 className="text-xl underline">Filtering</h3>

            <div className="space-y-3 w-full">
              <h4 className="capitalize">Filter by time</h4>
              <div className="flex flex-col gap-5">
                {["cookingTime", "preparationTime"].map((item: any) => (
                  <Controller
                    key={item}
                    control={filterControl}
                    name={item}
                    render={({ field }) => (
                      <Slider
                        {...field}
                        className="max-w-md"
                        defaultValue={0.2}
                        formatOptions={{ style: "decimal" }}
                        label={item}
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
                        maxValue={60}
                        minValue={0}
                        showTooltip={true}
                        size="sm"
                        step={5}
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
                  control={filterControl}
                  name="category"
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="max-w-xs"
                      label="Filter by category"
                      selectionMode="multiple"
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
                  control={filterControl}
                  name="cuisine"
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="max-w-xs"
                      label="Filter by cuisine"
                      selectionMode="multiple"
                      onChange={field.onChange}
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
                  control={filterControl}
                  name="tags"
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="max-w-xs"
                      label="Filter by tags"
                      selectionMode="multiple"
                      onChange={field.onChange}
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
                className=" text-white py-2 px-4 rounded-md"
                type="submit"
                variant="faded"
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
