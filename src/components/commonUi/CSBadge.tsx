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
      className="size-5 text-xs"
      color="danger"
      content={`${content}+`}
      shape="circle"
      size="sm"
    >
      <Button
        isIconOnly
        aria-label="more than 99 notifications"
        radius="full"
        variant="light"
      >
        {children}
      </Button>
    </Badge>
  );
};

export default CSBadge;
