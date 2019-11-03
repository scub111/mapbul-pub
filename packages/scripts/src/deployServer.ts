import appRootPath from 'app-root-path';
import { runSync, copyFileSync } from '@mapbul-pub/common';

export const deployServer = () => {
  console.log('Stoping site...');
  let output = runSync(`%WINDIR%/system32/inetsrv/appcmd stop site /site.name:"mapbul.pub"`);
  console.log('Building...');
  output = runSync(`npm run server-build`);
  console.log(output);
  console.log('Copying Web.config...');
  copyFileSync(`${appRootPath.path}/iis/Web.config`, `${appRootPath.path}/Web.config`);
  console.log('Starting site...');
  output = runSync(`%WINDIR%/system32/inetsrv/appcmd start site /site.name:"mapbul.pub"`);
};

deployServer();
