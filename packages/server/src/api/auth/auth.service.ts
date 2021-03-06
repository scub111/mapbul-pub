import { dbConnectionSingleton } from '@mapbul-pub/common';
import { IDbConnection, IAuthLogin, IUserDTO } from '@mapbul-pub/types';
import { getPasswordHash } from 'serverSrc/utils/passwordHash';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

export class AuthService {
  constructor(private jwtService: JwtService) {
    this.connection = dbConnectionSingleton.getInstance();
    this.jwtService = new JwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    });
  }

  private connection: IDbConnection;

  async validateUser(username: string, password: string): Promise<any> {
    const records: Array<IUserDTO> = await this.connection.query(`
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

  async login(user: Partial<IUserDTO>): Promise<IAuthLogin> {
    const payload: Partial<IUserDTO> = {
      id: user.id,
      guid: user.guid,
      email: user.email,
      userTypeId: user.userTypeId,
      registrationDate: user.registrationDate,
      deleted: user.deleted,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
