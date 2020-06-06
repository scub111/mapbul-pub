import * as React from 'react';
import { BoxProps, Box } from 'grommet';
// import { Text } from '@we-ui-components/base';
import { CompanyQualification } from 'interfaces';
import { Collapse } from './Collapse';
import { QualificationStatusIcon } from './StatusIcon';
import { rusalTheme } from 'themes';
import { QualificationList } from './List';

interface QualificationReportProps extends BoxProps {
  params: CompanyQualification;
}

export const QualificationReport: React.ComponentType<QualificationReportProps> = ({
  params,
  ...boxProps
}) => {
  let status: QualificationStatus = params.enableHelps ? 'passed' : 'failed';
  if (!isQualificationValid(params)) status = 'invalid';

  const titles: Record<QualificationStatus, string> = {
    passed:
      'Квалифицирован как соответствующий требованиям к заемщику по ПП РФ от 16.05.2020 № 696',
    failed:
      'Не квалифицирован как соответствующий требованиям к заемщику по ПП РФ от 16.05.2020 № 696',
    invalid: 'Не удалось получить данные о квалификации',
  };

  const title = titles[status];
  const colors = qualificationStatusColors(status);

  return (
    <Collapse
      prefix={
        <QualificationStatusIcon margin={{ right: '12px' }} status={status} />
      }
      title={title}
      titleProps={{
        pad: { vertical: '24px', left: '21px', right: '34px' },
        color: colors.text,
      }}
      collapsable={status !== 'invalid'}
      width="748px"
      background={colors.background}
      {...boxProps}
    >
      <Box>
        <QualificationList params={params} />

        {/* <Box pad={{ horizontal: '65px', bottom: '32px' }}>
          <Text>Среднесписочная численность организации в 2019г.</Text>
          <Text>{params.workPerson} человек</Text>
        </Box> */}
      </Box>
    </Collapse>
  );
};

export const qualificationStatusColors = (status: QualificationStatus) => {
  const palette = rusalTheme.palette;

  const colors: Record<
    QualificationStatus,
    { background: string; text: string }
  > = {
    passed: {
      background: '#E8F8F2',
      text: palette.Green,
    },
    failed: {
      background: '#FCDED3',
      text: palette.Red,
    },
    invalid: {
      background: '#F8F8F8',
      text: '#A4A7AB',
    },
  };

  return colors[status];
};

const isQualificationValid = (params: CompanyQualification) =>
  ![
    params.activity,
    params.moreThanYear,
    params.presented,
    params.bankruptcy,
    params.bankruptcy12Month,
    params.typeCompany,
    params.needHelpOkfed,
    params.listOkfed,
    params.workPerson,
    params.enableHelps,
  ].every(it => it === null);

export type QualificationStatus = 'invalid' | 'passed' | 'failed';
