import { Routes } from 'constants/routes';
import { ITabOptions } from 'components';

export const getTabs = (): Array<ITabOptions> => {
  return [
    {
      text: 'Обязательства',
      id: Routes.processes,
      roles: ['PRINCIPAL', 'BENEFICIARY', 'GUARANTOR'],
    },
    // {
    //   text: 'Справочники',
    //   roles: ['TREASURER', 'DIRECTORY_ADMINISTRATOR'],
    //   children: [
    //     {
    //       text: 'Заёмщики',
    //       id: Routes.dictIssuers,
    //     },
    //     {
    //       text: 'Займодавцы',
    //       id: Routes.dictCompanies,
    //     },
    //     {
    //       text: 'Пользователи',
    //       id: Routes.dictPersons,
    //     },
    //     {
    //       text: 'Процентные ставки',
    //       id: Routes.dictRates,
    //     },
    //     {
    //       text: 'Ставка дисконтирования',
    //       id: Routes.dictDiscountRates,
    //     },
    //   ]
    // },
    {
      text: 'Статистика',
      id: Routes.graph,
      roles: ['BENEFICIARY'],
    },
  ];
};
