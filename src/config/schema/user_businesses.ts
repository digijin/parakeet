import { Schema } from "./types";

export const userBusinessesSchema: Schema = {
  name: "user_businesses",
  schema: [
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
  ],
};
