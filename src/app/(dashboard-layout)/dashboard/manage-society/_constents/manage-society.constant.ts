const columns = [
  { name: "Name", uid: "name" },
  { name: "Admin", uid: "admin" },
  { name: "Privacy Type", uid: "privacyType" },
  { name: "Created At", uid: "createdAt", sortable: true },
  { name: "Updated At", uid: "updatedAt", sortable: true },
  { name: "Is Blocked", uid: "isBlocked" },
  { name: "Is Deleted", uid: "isDeleted" },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions };
