/* eslint-disable @typescript-eslint/no-unused-vars */

import { Pagination } from "@nextui-org/pagination";

const CSPagination = ({ lengthItem, pageNumber }: any) => {
  pageNumber = 1;
  const setPageNumber = (n: any) => {
    pageNumber = n;
  };

  return (
    <div>
      <Pagination
        isCompact
        showControls
        className="mx-auto mt-5"
        initialPage={1}
        total={lengthItem}
        onChange={(val: any) => setPageNumber(val)}
      />
    </div>
  );
};

export default CSPagination;
