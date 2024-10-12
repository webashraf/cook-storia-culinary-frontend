import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

export default function Stories() {
  return (
    <>
      <div className="flex lg:flex-nowrap flex-wrap gap-5 mb-10 mt-5 justify-between">
        <Card className=" lg:w-[300px] w-[47%] h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Featured Recipe
            </p>
            <h4 className="text-white font-medium text-large">
              Delicious Vegan Dishes
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-4.jpeg"
          />
        </Card>
        <Card className=" lg:w-[300px] w-[47%] h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Health Tips
            </p>
            <h4 className="text-white font-medium text-large">
              Boost Your Immune System
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-3.jpeg"
          />
        </Card>
        <Card className=" lg:w-[300px] w-[47%] hidden lg:block h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Cooking Hacks
            </p>
            <h4 className="text-white font-medium text-large">
              Time-Saving Kitchen Tips
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-2.jpeg"
          />
        </Card>
        <Card className=" lg:w-[300px] w-[47%] hidden lg:block h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Chef’s Corner
            </p>
            <h4 className="text-white font-medium text-large">
              Meet the Master Chefs
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://images.pexels.com/photos/9979277/pexels-photo-9979277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </Card>
      </div>
    </>
  );
}
