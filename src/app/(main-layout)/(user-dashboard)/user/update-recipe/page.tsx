"use client";

import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
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
import { nexiosInstance } from "@/src/config/axios.instance";
import { useUser } from "@/src/context/user.provider";

import UpdateProfileModal from "../_components/UpdateRecipeModal";

import { columns, statusOptions } from "./_constants/manage-recipe.constant";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "recipe",
  "status",
  "isDeleted",
  "isPremium",
  "update",
  "actions",
];

export function capitalize(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default function UpdateRecipePage() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateRecipeLoading, setUpdateRecipeLoading] = useState(false);
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
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data }: any = await nexiosInstance.get(
          `/recipe?user=${user?.id}`
        );

        if (data.success) {
          setLoading(false);
        }
        if (data && typeof data === "object" && "data" in data) {
          setRecipes(data.data);
        } else {
          setRecipes([]);
        }
      } catch (error: any) {
        toast.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [loading, user, updateRecipeLoading]);

  const filteredItems = useMemo(() => {
    let filteredrecipes = [...recipes];

    if (hasSearchFilter) {
      filteredrecipes = filteredrecipes.filter((recipe) =>
        recipe?.title?.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredrecipes = filteredrecipes.filter((recipe) =>
        Array.from(statusFilter).includes(recipe?.status)
      );
    }

    return filteredrecipes;
  }, [recipes, filterValue, statusFilter]);

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

  const handlePublish = useCallback((recipeId: string) => {
    nexiosInstance.put(`/recipe/status/${recipeId}?status=publish`, {});

    setLoading(true);
  }, []);

  const handleUnpublish = useCallback((recipeId: string) => {
    nexiosInstance.put(`/recipe/status/${recipeId}?status=unpublish`, {});

    setLoading(true);
  }, []);
  const handleRecipePremium = useCallback((recipeId: string) => {
    nexiosInstance.put(`/recipe/status/${recipeId}?isPremium=${true}`, {});

    setLoading(true);
  }, []);
  const handleRecipeFree = useCallback((recipeId: string) => {
    nexiosInstance.put(`/recipe/status/${recipeId}?isPremium=${false}`, {});

    setLoading(true);
  }, []);

  const handleDelete = useCallback((recipeId: string) => {
    nexiosInstance.put(`/recipe/status/${recipeId}?isDeleted=true`, {});

    setLoading(true);
  }, []);

  const renderCell = useCallback(
    (recipe: any, columnKey: any) => {
      const cellValue = recipe[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: recipe?.user?.profilePicture }}
              description={recipe?.user?.email}
              name={recipe?.user?.username}
            >
              {recipe?.user?.email}
            </User>
          );
        case "recipe":
          return (
            <div>
              <h4>{recipe?.title}</h4>
            </div>
          );
        case "isDeleted":
          return (
            <div>
              {recipe?.isDeleted ? <p className="text-red-500">Yes</p> : "No"}
            </div>
          );
        case "isPremium":
          return <div>{recipe?.isPremium ? "Yes" : "No"}</div>;
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {recipe?.user?.role}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={(statusColorMap as any)[recipe?.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "update": // Render update button
          return (
            <UpdateProfileModal
              recipe={recipe}
              setUpdateRecipeLoading={setUpdateRecipeLoading}
              updateRecipeLoading={updateRecipeLoading}
            />
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
                  <DropdownItem onClick={() => handlePublish(recipe?._id)}>
                    Publish
                  </DropdownItem>
                  <DropdownItem onClick={() => handleUnpublish(recipe?._id)}>
                    Unpublish
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleRecipePremium(recipe?._id)}
                  >
                    Make it Premium
                  </DropdownItem>
                  <DropdownItem onClick={() => handleRecipeFree(recipe?._id)}>
                    Make it Free
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDelete(recipe?._id)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [
      handlePublish,
      handleUnpublish,
      handleRecipeFree,
      handleRecipeFree,
      handleDelete,
    ]
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
        <h2>Update Recipe</h2>
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
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>{" "}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {recipes.length} recipes
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
    recipes.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
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
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column?.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No recipes found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
