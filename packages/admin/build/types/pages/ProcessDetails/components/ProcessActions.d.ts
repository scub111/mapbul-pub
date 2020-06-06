export declare const enum MODAL_MODE {
    INFO = "INFO",
    ACCEPT = "accept",
    REJECT = "reject",
    PROCESS = "process",
    DEFAULT = "DEFAULT",
    REVERT = "REVERT",
    CHANGE_AMOUNTS = "CHANGE_AMOUNTS"
}
interface IProposalActionsProps {
    isActionEnabled: boolean;
    setMode: (mode: MODAL_MODE) => void;
    mode: MODAL_MODE;
    onClose: () => void;
    onReject: () => void;
    onAccept: () => void;
    rejectText: string;
    acceptText: string;
    isDisabled?: boolean;
}
export declare const ProcessActions: ({ isActionEnabled, mode, setMode, onClose, onAccept, onReject, rejectText, acceptText, isDisabled, }: IProposalActionsProps) => JSX.Element;
export {};
