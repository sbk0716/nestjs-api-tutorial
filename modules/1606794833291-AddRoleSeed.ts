import { MigrationInterface, QueryRunner } from 'typeorm';
import { insertData } from '../modules/seed-manager';

export class AddRoleSeed1606794833291 implements MigrationInterface {
  name = 'AddRoleSeed1606794833291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const seeds = {
      role: [
        {
          id: 4,
          name: 'Console Admin',
        },
      ],
    };

    return insertData(queryRunner, seeds);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
