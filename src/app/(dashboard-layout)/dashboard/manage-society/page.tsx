"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { toast } from "sonner";

import { SearchIcon } from "@/src/components/icons";
import nexiosInstance from "@/src/config/nexios.instance";
import { getAllSociety } from "@/src/services/SocietyServices";

import SocietyUpdateModal from "./_component/SocietyUpdateModal";
import { columns, statusOptions } from "./_constents/manage-society.constant";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "admin",
  "privacyType",
  "isBlocked",
  "updatedAt",
  "isDeleted",
  "actions",
];

export function capitalize(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default function ManageSociety() {
  const [society, setSociety] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if ((visibleColumns as any) === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column?.uid)
    );
  }, [visibleColumns]);


  useEffect(() => {
    const fetchSociety = async () => {
      try {
        const { data }: any = await getAllSociety();

        if (data.length > 0) {
          setLoading(false);
          setSociety(data);
        }
        // if (data && typeof data === "object" && "data" in data) {
        // } else {
        //   setSociety([]);
      } catch (error: any) {
        toast.error("Error fetching society:", error);
      }
    };

    fetchSociety();
  }, [loading]);

  const filteredItems = useMemo(() => {
    let filteredSociety = [...society];

    if (hasSearchFilter) {
      filteredSociety = filteredSociety.filter((society) =>
        society?.societyName?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredSociety = filteredSociety.filter((society) =>
        Array.from(statusFilter).includes(society?.status)
      );
    }

    return filteredSociety;
  }, [society, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = (a as any)[sortDescriptor.column];
      const second = (b as any)[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handlePublic = useCallback(async (societyId: string) => {
    await nexiosInstance.put(`/society/update/${societyId}`, {
      privacyType: "Public",
    });

    setLoading(true);
  }, []);

  const handlePrivate = useCallback(async (societyId: string) => {
    await nexiosInstance.put(`/society/update/${societyId}`, {
      privacyType: "Private",
    });

    setLoading(true);
  }, []);
  const handleIsBlocked = useCallback(async (societyId: string) => {
    await nexiosInstance.put(`/society/update/${societyId}`, {
      isBlocked: true,
    });

    setLoading(true);
  }, []);
  const handleIsUnBlocked = useCallback(async (societyId: string) => {
    await nexiosInstance.put(`/society/update/${societyId}`, {
      isBlocked: false,
    });

    setLoading(true);
  }, []);

  const handleDelete = useCallback(async (societyId: string) => {
    await nexiosInstance.put(`/society/update/${societyId}`, {
      isDeleted: true,
    });

    setLoading(true);
  }, []);
  const handleRetrive = useCallback(async (societyId: string) => {
    await nexiosInstance.put(`/society/update/${societyId}`, {
      isDeleted: false,
    });

    setLoading(true);
  }, []);

  const renderCell = useCallback(
    (society: any, columnKey: any) => {
      const cellValue = society[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: society?.coverImage,
              }}
              description={society?.privacyType}
              name={society?.societyName}
            />
          );
        case "admin":
          return (
            <div>
              <p> {society?.admin?.username || "N/A"}</p>
              <p className="text-[12px]"> {society?.admin?.email || "N/A"}</p>
            </div>
          );
        case "privacyType":
          return <div className="capitalize">{cellValue || "Public"}</div>;
        case "createdAt":
        case "updatedAt":
          return <div>{new Date(cellValue).toLocaleDateString()}</div>;
        case "isBlocked":
          return (
            <div>
              {society?.isBlocked ? (
                <p className="text-yellow-500">Yes</p>
              ) : (
                <p className="text-green-500">No</p>
              )}
            </div>
          );
        case "isDeleted":
          return (
            <div>
              {society?.isDeleted ? (
                <p className="text-red-500">Yes</p>
              ) : (
                <p className="text-green-500">No</p>
              )}
            </div>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <BsThreeDotsVertical className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key={society?._id}>
                    {/* <SocietyUpdateModal /> */}
                  </DropdownItem>
                  <DropdownItem
                    key={society?._id}
                    onClick={() => handlePublic(society?._id)}
                  >
                    Public
                  </DropdownItem>
                  <DropdownItem
                    key={society?._id}
                    onClick={() => handlePrivate(society?._id)}
                  >
                    Private
                  </DropdownItem>

                  <DropdownItem
                    key={society?._id}
                    onClick={() => handleIsBlocked(society?._id)}
                  >
                    Block
                  </DropdownItem>
                  <DropdownItem
                    key={society?._id}
                    onClick={() => handleIsUnBlocked(society?._id)}
                  >
                    Unblock
                  </DropdownItem>
                  <DropdownItem
                    key={society?._id}
                    onClick={() => handleDelete(society?._id)}
                  >
                    Delete
                  </DropdownItem>
                  <DropdownItem
                    key={society?._id}
                    onClick={() => handleRetrive(society?._id)}
                  >
                    Retrieve Society
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <SocietyUpdateModal societyId={society?._id}  setLoading={ setLoading} />
            </div>
          );
        default:
          return cellValue || "N/A";
      }
    },
    [handlePublic, handlePrivate, handleDelete]
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mt-20">
        <h2>Manage Society</h2>
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={
                    <IoChevronDownCircleOutline className="text-small" />
                  }
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns as any}
              >
                {columns?.map((column, i) => (
                  <DropdownItem key={column?.uid + i} className="capitalize">
                    {capitalize(column?.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {society.length} recipes
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    society.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small hidden text-default-400">
          {(selectedKeys as any) === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor as any}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys as any}
      onSortChange={setSortDescriptor as any}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column?.uid}
            align={column?.uid === "actions" ? "center" : "start"}
            allowsSorting={column?.sortable}
          >
            {column?.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No society found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item?._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
