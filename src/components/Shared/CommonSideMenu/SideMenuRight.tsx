import UserCard from "@/src/app/(main-layout)/_components/UserCard/UserCard";

const SideMenuRight = () => {
  return (
    <div className="w-[20%] hidden lg:block ml-auto h-[90vh] bg-default-300/50 space-y-2 px-2 pt-5 mt-5 rounded-lg">
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
  );
};

export default SideMenuRight;
