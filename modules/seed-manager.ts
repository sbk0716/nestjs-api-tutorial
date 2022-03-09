import { QueryRunner } from 'typeorm';
import { ConsultantStatus } from '../entities/ConsultantStatus';
import { User } from '../entities/User';
import { UserPersonalInfo } from '../entities/UserPersonalInfo';
import { UserCompanyInfo } from '../entities/UserCompanyInfo';
import { UserBankInfo } from '../entities/UserBankInfo';
import { UserRole } from '../entities/UserRole';
import { Role } from '../entities/Role';
import { RoleRelationship } from '../entities/RoleRelationship';
import { Nationality } from '../entities/Nationality';

const Entity = {
  consultantStatus: ConsultantStatus,
  user: User,
  userPersonalInfo: UserPersonalInfo,
  userCompanyInfo: UserCompanyInfo,
  userBankInfo: UserBankInfo,
  userRole: UserRole,
  role: Role,
  roleRelationship: RoleRelationship,
  nationality: Nationality,
};

export type testDataSetType = {
  [key: string]: {
    [key: string]: any;
  }[];
};

export const insertData = async (queryRunner: QueryRunner, testDataSet: testDataSetType) => {
  for (const table of Object.keys(testDataSet)) {
    // @ts-ignore
    const TableModel = Entity[table];
    for (const data of testDataSet[table]) {
      const tableModel = new TableModel();
      Object.keys(data).forEach((column) => {
        tableModel[column] = data[column];
      });

      // eslint-disable-next-line no-await-in-loop
      await queryRunner.manager.save(tableModel);
    }
  }
};
