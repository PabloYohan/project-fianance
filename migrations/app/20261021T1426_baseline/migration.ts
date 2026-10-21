#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3fe4dad695d50f906541db1de01d58bf89fb9cb91f9dbbb13e29025cabf3fd6a/contract';
import endContract from '../../snapshots/3fe4dad695d50f906541db1de01d58bf89fb9cb91f9dbbb13e29025cabf3fd6a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Category',
        columns: [
          col('active', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
