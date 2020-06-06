import * as React from 'react';
import * as _ from 'lodash';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from 'grommet';
import { useStores } from 'stores';
import { Loader, TabsPanel } from './components';
import { ENTITY_STATUS, PROCESS_TYPE, REQUEST_STATUS, TRole } from 'interfaces';

import { getTypeByUrlType } from 'pages/Processes/utils';

import { RequestDetails } from './Request';
// import { GuaranteeDetails } from './Guarantee';
// import { AmountReduceCallDetails } from './AmountReduce';
// import { PaymentRequestDetails } from './PaymentRequest';

const { useState } = React;

const tabsConfig: Array<{
  id: PROCESS_TYPE;
  text: string;
  disabled?: boolean;
  linkProperty?: string;
  isHidden?: (data: { roles: TRole[]; status: any }) => boolean;
}> = [
  {
    id: PROCESS_TYPE.REQUEST,
    text: 'Карточка заявления',
    linkProperty: 'requestId',
  },
  // {
  //   id: PROCESS_TYPE.GUARANTEE,
  //   text: 'Гарантия',
  //   linkProperty: 'guaranteeId',
  // },
  // {
  //   id: PROCESS_TYPE.CLAIM,
  //   text: 'Снижение суммы',
  //   linkProperty: 'claimId',
  // },
  // {
  //   id: PROCESS_TYPE.REQUIREMENT,
  //   text: 'Требование платежа',
  //   linkProperty: 'guaranteeId',
  //   isHidden: data => !(data.status === ENTITY_STATUS.GUARANTOR_ACCEPTED || data.status === ENTITY_STATUS.CANCELED),
  // },
];

export interface IProcessDetailsData {
  id: string;
  type: PROCESS_TYPE;
  claimId?: string;
  requirementId?: string;
  processId: string;
}

export const ProcessDetails = observer<{
  id: string;
  type: PROCESS_TYPE;
  onDismiss: () => void;
  processData: IProcessDetailsData;
}>(({ id, type, onDismiss, processData }) => {
  const processType = getTypeByUrlType(type);
  const [tab, setTab] = useState<PROCESS_TYPE>(processType);
  const { activeProcess, modals, user } = useStores();

  const links = activeProcess.links;
  const data = activeProcess.getDataByType(tab);
  const activeTab = tabsConfig.find(t => t.id === tab) || tabsConfig[0];

  useEffect(() => {
    let linkId = id;

    if (processType !== tab) {
      linkId = links[activeTab.linkProperty];
    }

    let action = new Promise(() => {});

    switch (tab) {
      case PROCESS_TYPE.CALL:
        action = activeProcess.getCall(linkId);
        break;

      case PROCESS_TYPE.REQUEST:
        const isForBank = user.isContainOneOfRoles(['BANK', 'OBSERVER']);

        action = activeProcess.getRequest(linkId, isForBank).then(data => {
          const isUserOwner = data.bankId === user.userInfo.companyId;

          const showCount =
            ((user.isContainRoles(['BANK']) && isUserOwner) ||
              user.isContainRoles(['REGULATOR']) ||
              user.isContainRoles(['OBSERVER'])) &&
            (data.status === REQUEST_STATUS.CREATED ||
              data.status === REQUEST_STATUS.BANK_APPROVED);

          if (showCount) {
            return activeProcess.getPersonalCountRisk(data.id);
          }
        });
        break;

      case PROCESS_TYPE.GUARANTEE:
      case PROCESS_TYPE.CLAIM:
      case PROCESS_TYPE.REQUIREMENT:
        if (!activeProcess.guaranteeData) {
          action = Promise.all([
            activeProcess.getGuarantee(linkId),
            activeProcess.getClaims(linkId),
            activeProcess.getPaymentRequests(linkId),
          ]).then(([guarantee, claims, paymentRequests]) => {
            if (paymentRequests.length && processData.requirementId) {
              return setTab(PROCESS_TYPE.REQUIREMENT);
            }

            if (claims.length && processData.claimId) {
              return setTab(PROCESS_TYPE.CLAIM);
            }
          });
        }
        break;

      default:
        return null;
    }

    action.catch(() => {
      modals.closeModal();
    });
  }, [
    activeProcess,
    activeTab.linkProperty,
    id,
    links,
    tab,
    processType,
    modals,
  ]);

  const renderLoader = () => (
    <Box style={{ height: '500px' }}>
      <Loader />
    </Box>
  );

  const { guaranteeData = {} as any } = activeProcess;
  const status: ENTITY_STATUS = _.get(guaranteeData, 'status', '');

  const isClaimTabEnabled =
    guaranteeData &&
    ['GUARANTOR_ACCEPTED', 'CANCELED'].includes(guaranteeData.status);

  const tabs = tabsConfig
    .filter(
      tab =>
        !(
          tab.isHidden instanceof Function &&
          tab.isHidden({ roles: user.roles, status })
        ),
    )
    .map(tab => ({
      ...tab,
      disabled:
        tab.id === PROCESS_TYPE.CLAIM
          ? !isClaimTabEnabled
          : !links[tab.linkProperty],
    }));

  const renderBody = () => {
    switch (tab) {
      case PROCESS_TYPE.REQUEST:
        return <RequestDetails onDismiss={onDismiss} />;

      // case PROCESS_TYPE.GUARANTEE:
      //   return <GuaranteeDetails onDismiss={onDismiss} setTab={setTab} />;
      // case PROCESS_TYPE.CLAIM:
      //   return <AmountReduceCallDetails onDismiss={onDismiss} />;
      // case PROCESS_TYPE.REQUIREMENT:
      //   return <PaymentRequestDetails onDismiss={onDismiss} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      {false ? (
        <TabsPanel selected={tab} onChange={setTab} tabs={tabs} />
      ) : null}

      {data ? renderBody() : renderLoader()}
    </Box>
  );
});
