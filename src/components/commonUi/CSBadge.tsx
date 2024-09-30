import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { ReactNode } from "react";

const CSBadge = ({
  content = 9,
  children,
}: {
  content?: number;
  children: ReactNode;
}) => {
  return (
    <Badge
      content={`${content}+`}
      size="sm"
      shape="circle"
      className="size-5 text-xs"
      color="danger"
    >
      <Button
        radius="full"
        isIconOnly
        aria-label="more than 99 notifications"
        variant="light"
      >
        {children}
      </Button>
    </Badge>
  );
};

export default CSBadge;
