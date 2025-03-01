import { usersSchema } from "./users";
import { businessesSchema } from "./businesses";
import { userBusinessesSchema } from "./user_businesses";

const schemas = [usersSchema, businessesSchema, userBusinessesSchema];

export { usersSchema, businessesSchema, userBusinessesSchema };
export default schemas;
