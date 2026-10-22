#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3fe4dad695d50f906541db1de01d58bf89fb9cb91f9dbbb13e29025cabf3fd6a/contract';
import startContract from '../../snapshots/3fe4dad695d50f906541db1de01d58bf89fb9cb91f9dbbb13e29025cabf3fd6a/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/e9b60a8f6991d3a8b27696bc742d25651aa800aa5c205df32d613558d0437d71/contract';
import endContract from '../../snapshots/e9b60a8f6991d3a8b27696bc742d25651aa800aa5c205df32d613558d0437d71/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setDefault({
        schema: 'public',
        table: 'Category',
        column: col('active', 'bool', { default: lit(true), codecRef: { codecId: 'pg/bool@1' } }),
      }),
      this.setNotNull({ schema: 'public', table: 'Category', column: 'name' }),
      this.setNotNull({ schema: 'public', table: 'Category', column: 'type' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
