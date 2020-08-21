import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, } from '@mapbul-pub/types';
import { getPasswordHash } from 'serverSrc/utils/passwordHash';

export class AuthService {
  constructor() {
    this.connection = dbConnectionSingleton.getInstance();
  }

  private connection: IDbConnection;

  async validateUser(username: string, password: string): Promise<any> {
    const records: Array<any> = await this.connection.query(`
      SELECT
        \`id\`,
        \`email\`,
        \`guid\`,
        \`userTypeId\`,
        \`registrationDate\`,
        \`deleted\`
      FROM user WHERE email='${username}' AND password='${getPasswordHash(password)}'`);

    return records.length > 0 ? records[0] : null;
  }
}
