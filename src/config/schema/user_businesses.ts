export const userBusinessesSchema = [
  {
    name: "userId",
    type: "text",
    required: true,
    unique: false,
  },
  {
    name: "businessId",
    type: "text",
    required: true,
    unique: false,
  },
  {
    name: "role",
    type: "text",
    required: true,
    unique: false,
  },
  {
    name: "createdAt",
    type: "date",
    required: true,
    unique: false,
    options: {
      default: "now()",
    },
  },
];
