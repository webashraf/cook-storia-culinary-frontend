import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { Slider } from "@nextui-org/slider";
import { Controller } from "react-hook-form";

import {
  recipeCategories,
  recipeCuisines,
  recipeTags,
} from "@/src/constent/recipe.constant";

const RecipeFilter = ({
  setQuerySearchFilter,
  filterControl,
  handleFilterSubmit,
}: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    // resetFilter();
  };

  return (
    <div>
      <>
        <Button variant="faded" onPress={onOpen}>
          Filter Recipe
        </Button>
        <Modal
          backdrop="opaque"
          className="bg-default-50"
          isOpen={isOpen}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
          size="xl"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <form
                    className="  rounded-md p-5 space-y-10"
                    onSubmit={handleFilterSubmit(onFilterSubmit)}
                  >
                    <h3 className="text-xl underline">Filtering</h3>

                    <div className="space-y-3 w-full">
                      <h4 className="capitalize">Filter by time</h4>
                      <div className="flex flex-col gap-5">
                        {["cookingTime", "preparationTime"].map(
                          (item: any, i: number) => (
                            <Controller
                              key={item + i}
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
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="capitalize">Other filter options</h4>
                      <div className="flex lg:flex-col gap-5">
                        <div className="lg:w-full w-[33%]">
                          <Controller
                            control={filterControl}
                            name="categories"
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="max-w-xs"
                                label="Filter by category"
                                selectionMode="multiple"
                              >
                                {recipeCategories.map((item, i) => (
                                  <SelectItem key={item + i}>{item}</SelectItem>
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
                                {recipeCuisines.map((item, i) => (
                                  <SelectItem key={item + i}>{item}</SelectItem>
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
                                {recipeTags.map((item, i) => (
                                  <SelectItem key={item + i}>{item}</SelectItem>
                                ))}
                              </Select>
                            )}
                          />
                        </div>
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
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default RecipeFilter;
