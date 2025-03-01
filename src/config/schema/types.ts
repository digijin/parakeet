export interface Schema {
  name: string;
  schema: Array<{
    name: string;
    type: string;
    required: boolean;
    unique: boolean;
    options?: object;
  }>;
}
