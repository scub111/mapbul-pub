import { Builder, ThenableWebDriver, until, By, WebDriver, Capabilities } from 'selenium-webdriver';
import * as firefox from 'selenium-webdriver/firefox';
import * as path from 'path';
import { sleep } from 'common/helper';
import * as appRootPath from 'app-root-path';

const getElementById = async (driver: ThenableWebDriver, id: string, timeout = 20000) => {
   // const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
   // return await driver.wait(until.elementIsVisible(el), timeout);
   return await driver.findElement(By.id(id));
};

describe('webdriver', () => {
   let drivers: ThenableWebDriver[] = [];

   beforeAll(async () => {
      jest.setTimeout(60000);

      const ieDriver = new Builder().withCapabilities(Capabilities.ie()).build();
      drivers.push(ieDriver);

      const chromeDriver = new Builder().withCapabilities(Capabilities.chrome()).build();
      drivers.push(chromeDriver);

      const options = new firefox.Options().setBinary(
         'C:\\Program Files\\Mozilla Firefox\\firefox.exe'
      );
      const firefoxDriver = new Builder()
         .withCapabilities(Capabilities.firefox())
         .setFirefoxOptions(options)
         .build();
      drivers.push(firefoxDriver);

      await doByManyDriversAtOnce(async (driver) => {
         // await driver.get('file://' + path.join(appRootPath.path, '/build/index.html'));
         await driver.get('http://localhost:8080/');
      });
   });

   afterAll(async () => {
      await doByManyDriversAtOnce(async (driver) => {
         await driver.quit();
      });
   });

   const clickCell = async (driver: ThenableWebDriver, id: string) => {
      const element = await getElementById(driver, id);
      await element.click();
      // await sleep(100);
   };

   const doByManyDriversAtOnce = async (fn: (driver: ThenableWebDriver) => void) => {
      let promises = [];

      const fnInt = async (driver: ThenableWebDriver) => {
         try {
            await fn(driver);
         } catch (e) {
            const cap = await driver.getCapabilities();
            console.log(`[${cap.get('browserName')} fail]`);
            throw e;
         }
      };

      for (const driver of drivers) {
         promises.push(fnInt(driver));
      }

      await Promise.all(promises);
   };

   it('test', async () => {
      await doByManyDriversAtOnce(async (driver) => {
         const rootElement = await getElementById(driver, 'root');

         const rootText = await rootElement.getText();
         // console.log(rootText);
         expect(rootText).toContain('Hello World');
         expect(rootText).toContain('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');

         await clickCell(driver, 'cell0');
         await clickCell(driver, 'cell1');
         await clickCell(driver, 'cell4');
         await clickCell(driver, 'cell5');
         await clickCell(driver, 'cell8');

         // await sleep(10);
         const statusElement = await getElementById(driver, 'status');
         const statusText = await statusElement.getText();
         // console.log(statusText);
         expect(statusText).toContain('Player 1 won');
      });
   });
});
