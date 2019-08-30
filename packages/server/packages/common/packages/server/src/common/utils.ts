import fs from 'fs';
import appRootPath from 'app-root-path';

export const dbConnection = JSON.parse(
  fs.readFileSync(`${appRootPath.path}/db-connection.json`, 'utf8')
);
