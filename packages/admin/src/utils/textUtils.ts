import { UserInfo } from 'models';
import { isDefined } from 'utils';
import { EmptyString } from 'constants/strings';

export const plural = (number: number, titles: Array<string>) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

export const getFullName = (fullName: {
  lastName: string;
  firstName: string;
  middleName: string;
}): string =>
  `${fullName.lastName} ${fullName.firstName} ${fullName.middleName}`;

export function mergeUserNames(data: UserInfo): UserInfo {
  return {
    ...data,
    lastName: `${data.lastName} ${data.firstName} ${printSimple(
      data.meta?.patronymic,
    )}`,
  };
}

export function splitUserNames(data: UserInfo): UserInfo {
  const names = data.lastName.split(' ').filter(item => item !== '');
  return {
    ...data,
    lastName: names.length > 0 ? names[0] : data.lastName,
    firstName: names.length > 1 ? names[1] : data.firstName,
    meta: { patronymic: names.length > 2 ? names[2] : data?.meta?.patronymic },
  };
}

export function printDefined(value: string): string {
  return isDefined(value) ? value : EmptyString;
}

export function printSimple(value: string): string {
  return isDefined(value) ? value : '';
}

export function getTextLength(
  text: string,
  fontSize = 16,
  iterFn?: (ch: string, i: number, textLength: number) => boolean,
): number {
  let upperCount = 0;
  let lowerCount = 0;
  let restCount = 0;
  let textLength = 0;
  try {
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if ((ch >= 'A' && ch <= 'Z') || (ch >= 'А' && ch <= 'Я')) {
        upperCount++;
      } else if (
        (ch >= 'a' && ch <= 'z') ||
        (ch >= 'а' && ch <= 'я') ||
        (ch >= '0' && ch <= '9')
      ) {
        lowerCount++;
      } else {
        restCount++;
      }
      textLength = Math.round(
        (fontSize / 16) * (11 * upperCount + 9 * lowerCount + 6 * restCount),
      );
      if (typeof iterFn === 'function') {
        if (iterFn(ch, i, textLength)) {
          break;
        }
      }
    }
  } catch (err) {}
  return textLength;
}

export function getTextLimitIndex(
  text: string,
  limit: number,
  fontSize = 16,
): number {
  let index = 0;
  getTextLength(text, fontSize, (_: string, i: number, textLength: number) => {
    if (textLength >= limit) {
      index = i;
      return true;
    }
    return false;
  });
  return index;
}
