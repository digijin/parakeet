export interface QueryOptions {
  sort?: string;
  filter?: string;
  expand?: string;
  fields?: string[];
  page?: number;
  perPage?: number;
}

export interface DatabaseRecord {
  id: string;
  created: string;
  updated: string;
}

export interface DatabaseClient {
  findOne<T extends DatabaseRecord>(collection: string, id: string): Promise<T>;
  findOneByQuery<T extends DatabaseRecord>(collection: string, query: string): Promise<T>;
  findMany<T extends DatabaseRecord>(collection: string, options?: QueryOptions): Promise<T[]>;
  create<T extends DatabaseRecord>(collection: string, data: Partial<Omit<T, keyof DatabaseRecord>>): Promise<T>;
  update<T extends DatabaseRecord>(collection: string, id: string, data: Partial<Omit<T, keyof DatabaseRecord>>): Promise<T>;
  delete(collection: string, id: string): Promise<void>;
  authenticate(email: string, password: string): Promise<{ token: string; user: DatabaseRecord }>;
  isAuthenticated(): boolean;
  logout(): void;
} 