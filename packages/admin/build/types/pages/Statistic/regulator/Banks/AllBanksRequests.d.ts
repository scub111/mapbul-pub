import { IAllBankInfo } from 'interfaces';
interface IProps {
    onClose?: () => void;
    data: IAllBankInfo[];
}
export declare const AllBanksRequests: (props: IProps) => JSX.Element;
export {};
