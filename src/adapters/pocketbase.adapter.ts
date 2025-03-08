import PocketBase from 'pocketbase';
import type { RecordModel } from 'pocketbase';
import { DatabaseClient, DatabaseRecord, QueryOptions } from '@/interfaces/database';

export class PocketBaseAdapter implements DatabaseClient {
  private pb: PocketBase;

  constructor(url: string) {
    this.pb = new PocketBase(url);
  }

  private convertRecord<T extends DatabaseRecord>(record: RecordModel): T {
    const { id, created, updated, ...rest } = record;
    return { ...rest, id, created, updated } as unknown as T;
  }

  async findOne<T extends DatabaseRecord>(collection: string, id: string): Promise<T> {
    const record = await this.pb.collection(collection).getOne(id);
    return this.convertRecord<T>(record);
  }

  async findOneByQuery<T extends DatabaseRecord>(collection: string, query: string): Promise<T> {
    const record = await this.pb.collection(collection).getFirstListItem(query);
    return this.convertRecord<T>(record);
  }

  async findMany<T extends DatabaseRecord>(collection: string, options?: QueryOptions): Promise<T[]> {
    const records = await this.pb.collection(collection).getList(
      options?.page || 1,
      options?.perPage || 50,
      {
        sort: options?.sort,
        filter: options?.filter,
        expand: options?.expand,
        fields: options?.fields?.join(','),
      }
    );
    return records.items.map(record => this.convertRecord<T>(record));
  }

  async create<T extends DatabaseRecord>(
    collection: string,
    data: Partial<Omit<T, keyof DatabaseRecord>>
  ): Promise<T> {
    const record = await this.pb.collection(collection).create(data);
    return this.convertRecord<T>(record);
  }

  async update<T extends DatabaseRecord>(
    collection: string,
    id: string,
    data: Partial<Omit<T, keyof DatabaseRecord>>
  ): Promise<T> {
    const record = await this.pb.collection(collection).update(id, data);
    return this.convertRecord<T>(record);
  }

  async delete(collection: string, id: string): Promise<void> {
    await this.pb.collection(collection).delete(id);
  }

  async authenticate(email: string, password: string): Promise<{ token: string; user: DatabaseRecord }> {
    const authData = await this.pb.collection('users').authWithPassword(email, password);
    return {
      token: authData.token,
      user: this.convertRecord(authData.record),
    };
  }

  isAuthenticated(): boolean {
    return this.pb.authStore.isValid;
  }

  logout(): void {
    this.pb.authStore.clear();
  }
} 