export interface IAdminConfig {
  baseUrl: string;
  imageUrl: string;
}

class GlobalVarClass {
  constructor() {    
    this.env = {
      baseUrl: process.env.BASE_URL || '',
      imageUrl: process.env.IMAGE_URL || '',
    };
  }
  public env: IAdminConfig;
}

export const GlobalVar = new GlobalVarClass();