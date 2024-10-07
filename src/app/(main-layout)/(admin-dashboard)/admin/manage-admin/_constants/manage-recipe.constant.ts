const columns = [
  { name: "Name", uid: "name" },
  { name: "isDeleted", uid: "isDeleted" },
  { name: "isPremium", uid: "isPremium" },
  { name: "Role", uid: "role" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Deleted", uid: "deleted" },
  { name: "Premium", uid: "premium" },
  // { name: "Unpublished", uid: "unpublished" },
];

export { columns, statusOptions };
