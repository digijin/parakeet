import { Schema } from "./types";

export const usersSchema: Schema = {
  name: "users",
  schema: [
    {
      name: "userId",
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
      name: "email",
      type: "text",
      required: true,
      unique: true,
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
