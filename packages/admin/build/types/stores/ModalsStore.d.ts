import { ReactRenderFn } from 'interfaces';
export interface IModalProps {
    width?: string;
    position?: 'flex-start' | 'center';
    isOverlayClose?: boolean;
}
export declare class ModalsStore {
    render?: ReactRenderFn;
    options?: IModalProps;
    onClose?: () => any;
    scrollTo?: () => void;
    openModal: (render: ReactRenderFn, onClose?: () => any, options?: IModalProps) => void;
    closeModal: () => void;
}
