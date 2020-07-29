import { readFileAsync, checkFileExistsAsync } from 'scub111-fileio';
import { join } from 'path';
import * as appRootPath from 'app-root-path';
const fullPath = join(appRootPath.path, 'data');

export const getData = async () => {
   // const data = [
   //    {
   //       body: 'quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto',
   //       id: 1,
   //       title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
   //       userId: 1,
   //    },
   //    {
   //       body: 'est rerum tempore vitae↵sequi sint nihil reprehenderit dolor beatae ea dolores neque↵fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis↵qui aperiam non debitis possimus qui neque nisi nulla',
   //       id: 2,
   //       title: 'qui est esse',
   //       userId: 1,
   //    }
   // ];
   const fileName = `${fullPath}\\data.json`;
   let data = null;
   if (await checkFileExistsAsync(fileName)) {
      // data = JSON.parse((await promises.readFile(`${fullPath}\\data1.json`)).toString());
      data = JSON.parse(await readFileAsync(fileName));
   }
   return data;
};
