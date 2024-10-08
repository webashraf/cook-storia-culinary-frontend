const columns = [
  { name: "Name", uid: "name" },
  { name: "Recipe", uid: "recipe" },
  { name: "isDeleted", uid: "isDeleted" },
  { name: "Premium", uid: "isPremium" },
  { name: "Role", uid: "role" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Update", uid: "update" },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Deleted", uid: "deleted" },
  { name: "Published", uid: "published" },
  // { name: "Unpublished", uid: "unpublished" },
];

export { columns, statusOptions };
