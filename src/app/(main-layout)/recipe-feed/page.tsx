"use client";

import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Slider } from "@nextui-org/slider";
import { useState } from "react";

import PostCard from "../_components/PostCard/PostCard";

import CommonHero from "@/src/components/Shared/CommonHero/CommonHero";
import { SearchIcon } from "@/src/components/icons";
import { recipes } from "@/src/constent/recipe.fakeData";

const RecipeFeed = () => {
  const [selected, setSelected] = useState("london");
  const [value, setValue] = useState<any>([100, 300]);

  return (
    <>
      <div className="mx-10">
        <CommonHero title="recipe feed" />

        <div>
          <div className="py-5">
            <div className="w-52">
              <Input
                isClearable
                placeholder="Type to search..."
                radius="lg"
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
          </div>
          <div className="flex gap-5">
            <ScrollShadow
              hideScrollBar
              className="ml-auto w-[85%] h-screen "
              offset={0}
              // ScrollShadowVisibility="none"
              isEnabled={false}
            >
              <div className="grid grid-cols-1 gap-5 ">
                {recipes.map((recipe) => (
                  <PostCard key={recipe.title} recipe={recipe} />
                ))}
              </div>
            </ScrollShadow>
            <div className="h-[70vh] bg-default-400/30 w-[30%] rounded-md p-5 space-y-5">
              <h3 className="text-xl underline ">Filtering</h3>

              <div>
                <h4 className="capitalize">Filter by cooking time</h4>
                <Slider
                  className="max-w-md"
                  getValue={(time) => `${time} minutes`}
                  label="Donuts to buy"
                  maxValue={300}
                  size="md"
                />
              </div>
              <div>
                <h4 className="capitalize">Filter by categories</h4>
                <RadioGroup value={selected} onValueChange={setSelected}>
                  <Radio value="buenos-aires">Buenos Aires</Radio>
                  <Radio value="sydney">Sydney</Radio>
                  <Radio value="san-francisco">San Francisco</Radio>
                  <Radio value="london">London</Radio>
                  <Radio value="tokyo">Tokyo</Radio>
                </RadioGroup>
              </div>
              <div>
                <h4 className="capitalize">Filter by ingredients</h4>
                <RadioGroup orientation="horizontal">
                  <Radio value="buenos-aires">Buenos Aires</Radio>
                  <Radio value="sydney">Sydney</Radio>
                  <Radio value="san-francisco">San Francisco</Radio>
                  <Radio value="london">London</Radio>
                  <Radio value="tokyo">Tokyo</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeFeed;
