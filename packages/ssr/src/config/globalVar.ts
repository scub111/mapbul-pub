export type TLangs = 'en' | 'ru';

class GlobalVarClass {
  private _lang: TLangs = 'en';
  private _isRus = false;

  public setLang(lang: string | Array<string>) {
    this._lang = lang as TLangs;
    this._isRus = this._lang === 'ru';
  }

  public get lang(): TLangs {
    return this._lang;
  }

  public get isRus(): boolean {
    return this._isRus;
  }
}

export const GlobalVar = new GlobalVarClass();
