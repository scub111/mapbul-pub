const dotenv = require('dotenv');

export interface IAdminConfig {
  baseUrl: string;
}

class GlobalVarClass {
  constructor() {
    
    this.env = {
      baseUrl: process.env.BASE_URL || '',
    };
  }
  public env: IAdminConfig;
}

export const GlobalVar = new GlobalVarClass();