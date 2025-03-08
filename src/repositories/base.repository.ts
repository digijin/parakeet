import { DatabaseClient, DatabaseRecord, QueryOptions } from '@/interfaces/database';

export abstract class BaseRepository<T extends DatabaseRecord> {
  constructor(
    protected readonly db: DatabaseClient,
    protected readonly collectionName: string
  ) {}

  async findOne(id: string): Promise<T> {
    return this.db.findOne<T>(this.collectionName, id);
  }

  async findOneByQuery(query: string): Promise<T> {
    return this.db.findOneByQuery<T>(this.collectionName, query);
  }

  async findMany(options?: QueryOptions): Promise<T[]> {
    return this.db.findMany<T>(this.collectionName, options);
  }

  async create(data: Partial<Omit<T, keyof DatabaseRecord>>): Promise<T> {
    return this.db.create<T>(this.collectionName, data);
  }

  async update(id: string, data: Partial<Omit<T, keyof DatabaseRecord>>): Promise<T> {
    return this.db.update<T>(this.collectionName, id, data);
  }

  async delete(id: string): Promise<void> {
    return this.db.delete(this.collectionName, id);
  }
} 