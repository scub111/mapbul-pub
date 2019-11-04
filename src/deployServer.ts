// import appRootPath from 'app-root-path';
import { runSync, copyFileSync } from 'scub111-common';

export const deployServer = () => {
  console.log('Stoping site mapbul.pub...');
  let output = runSync(`%WINDIR%/system32/inetsrv/appcmd stop site /site.name:"mapbul.pub"`);
  console.log('Building...');
  output = runSync(`npm run build:deploy`);
  console.log(output);
  // console.log('Copying Web.config...');
  // copyFileSync(`${appRootPath.path}/iis/Web.config`, `${appRootPath.path}/Web.config`);
  console.log('Starting site mapbul.pub...');
  output = runSync(`%WINDIR%/system32/inetsrv/appcmd start site /site.name:"mapbul.pub"`);
};

deployServer();
