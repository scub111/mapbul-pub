import { IBankInfo } from 'interfaces';
interface IProps {
    onClose?: () => void;
    data: IBankInfo[];
}
export declare const AllBanksRequests: (props: IProps) => JSX.Element;
export {};
