export interface ISSRConfig {
  basUrl: string | undefined;
}

class GlobalVarClass {
  public env: ISSRConfig | undefined;

  public setup = (path: string): ISSRConfig => {
    const result = require('dotenv').config({ path });
    // console.log(result);
    this.env = {
      basUrl: process.env.BASE_URL
    };
    return this.env;
  };
}

export const GlobalVar = new GlobalVarClass();