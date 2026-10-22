#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/c987146c16f26bb52326b86790f9147a0abb42e239a1aa2f56ccb0eab4feb70e/contract';
import endContract from '../../snapshots/c987146c16f26bb52326b86790f9147a0abb42e239a1aa2f56ccb0eab4feb70e/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e9b60a8f6991d3a8b27696bc742d25651aa800aa5c205df32d613558d0437d71/contract';
import startContract from '../../snapshots/e9b60a8f6991d3a8b27696bc742d25651aa800aa5c205df32d613558d0437d71/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Transaction',
        columns: [
          col('categoryId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('date', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('value', 'numeric(15,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 15, scale: 2 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'Category',
        constraint: 'Category_type_check_5d925dfc',
        expression: sql`"type" IN ('INCOME', 'EXPENSE')`,
      }),
      this.createIndex({
        schema: 'public',
        table: 'Transaction',
        index: 'Transaction_categoryId_idx_15c304f2',
        columns: ['categoryId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Transaction',
        foreignKey: {
          name: 'Transaction_categoryId_fkey',
          columns: ['categoryId'],
          references: { schema: 'public', table: 'Category', columns: ['id'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
