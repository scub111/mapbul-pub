interface IProps {
    url: string;
    title: string;
    fileName?: string;
    actions?: IAdditionalAction[];
}
interface IAdditionalAction {
    name: string;
    action: () => void;
}
export declare function DownloadFileBox(props: IProps): JSX.Element;
export {};
