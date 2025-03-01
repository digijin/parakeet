export const reviewsSchema = [
  {
    name: "placeId",
    type: "text",
    required: true,
    unique: false,
  },
  {
    name: "author",
    type: "text",
    required: true,
    unique: false,
  },
  {
    name: "content",
    type: "text",
    required: true,
    unique: false,
  },
  {
    name: "rating",
    type: "number",
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
