const columns = [
  { name: "Name", uid: "name" },
  { name: "Recipe", uid: "recipe" }, // New column
  { name: "isDeleted", uid: "isDeleted" }, // New column
  { name: "isPremime", uid: "isPremime" }, // New column
  { name: "Role", uid: "role" },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions };
