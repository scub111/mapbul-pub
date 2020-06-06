import * as React from 'react';

import { Box, BoxProps } from 'grommet';
import { Text } from '@we-ui-components/base';
import { CompanyQualification } from 'interfaces';
import { QualificationStatusIcon } from './StatusIcon';

interface QualificationListProps {
  params: CompanyQualification;
}

export const QualificationList = ({ params }: QualificationListProps) => {
  // const companyTypeStatus = [1, 2].includes(params.typeCompany);
  const texts = getTexts(params);
  const isLegalEntity = params.companyInn.length === 10;
  return (
    <Box pad={{ horizontal: '65px', bottom: '26px' }}>
      <ListItem isOk={params.activity} text={texts.activity} />
      {/* <ListItem isOk={params.moreThanYear} text={texts.moreThanYear} /> */}
      {/* <ListItem isOk={companyTypeStatus} text={texts.typeCompany} /> */}
      <ListItem isOk={params.needHelpOkfed} text={texts.needHelpOkfed} />
      {isLegalEntity && <ListItem isOk={params.nko} text={texts.nko} />}
      {!isLegalEntity && (
        <ListItem
          isOk={params.ipPersonalMoreZero}
          text={texts.ipPersonalMoreZero}
        />
      )}
      <ListItem isOk={!params.bankruptcy} text={texts.bankruptcy} />
      <ListItem
        isOk={!params.bankruptcy12Month}
        text={texts.bankruptcy12Month}
      />
    </Box>
  );
};

const ListItem = ({ isOk, text, ...props }: ListItemProps) => (
  <Box direction="row" align="start" {...props}>
    <QualificationStatusIcon
      status={isOk ? 'passed' : 'failed'}
      height="16px"
      width="16px"
      margin={{ right: '8px', top: '3px' }}
      style={{ minWidth: '16px' }}
    />
    {typeof text === 'string' ? <Text>{text}</Text> : text}
  </Box>
);

type ListItemProps = BoxProps & {
  isOk: boolean;
  text?: React.ReactNode;
};

const getTexts = (
  params: CompanyQualification,
): Record<ParamsTexts, string> => {
  const texts: Record<ParamsTexts, [React.ReactNode, React.ReactNode]> = {
    companyInn: ['', ''],
    typeCompany: ['', ''],
    activity: [
      'Компания является действующей',
      'Компания не является действующей',
    ],
    moreThanYear: [
      'Более года от создания компании',
      'Менее года от создания компании',
    ],
    needHelpOkfed: [
      <Box>
        <Text>
          Организация отнесена к пострадавшим от пандемии по следующим кодам
          ОКВЭД:
        </Text>
        <Text>{(params.listOkfed || []).join(', ')}</Text>
      </Box>,
      'Организация не отнесена к пострадавшим от пандемии',
    ],
    bankruptcy: [
      'Обнаружены признаки завершенной процедуры банкротства',
      'Признаков завершенной процедуры банкротства не обнаружено',
    ],
    bankruptcy12Month: [
      'Обнаружены сообщения о банкротстве за последние 12 месяцев',
      'За последние 12 месяцев сообщений о банкротстве не обнаружено',
    ],
    nko: [
      'Организация включена в реестр социально ориентированных НКО',
      'Организация не включена в реестр социально ориентированных НКО',
    ],
    ipPersonalMoreZero: [
      'Численность ИП больше нуля',
      'Численность ИП равна нулю',
    ],
  };

  const result = {} as Record<ParamsTexts, string>;

  for (const [key, value] of Object.entries(params)) {
    if (texts[key]) {
      const [trueText, falseText] = texts[key];
      result[key] = value ? trueText : falseText;
    }
  }

  // special case
  // const companyType = getCompanyType(params.typeCompany);
  // result.typeCompany =
  //   params.presented && companyType
  //     ? `Организация включена в реестр МСП по категории: ${companyType}`
  //     : 'Организация не включена в реестр МСП';

  return result;
};

// const getCompanyType = (type: CompanyQualification['typeCompany']) => {
//   const companyTypes = [
//     'микроорганизация',
//     'малое предприятие',
//     'среднее предприятие',
//   ];

//   return companyTypes[type - 1];
// };

type ParamsTexts = keyof Omit<
  CompanyQualification,
  'enableHelps' | 'listOkfed' | 'presented' | 'workPerson'
>;
