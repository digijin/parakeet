import { Schema } from "./types";

export const businessesSchema: Schema = {
  name: "businesses",
  schema: [
    {
      name: "businessId",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
      unique: false,
    },
    {
      name: "address",
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
  ],
};
