import { IRequestFormData, CompanyQualification } from 'interfaces';
export declare const CallerInfoForBank: ({ observerData, onSearch, qualification, setQualification, onError, }: CallerInfoForBankProps) => JSX.Element;
declare type CallerInfoForBankProps = {
    observerData: IRequestFormData;
    qualification: CompanyQualification;
    onSearch: Function;
    onError: Function;
    setQualification: Function;
};
export {};
