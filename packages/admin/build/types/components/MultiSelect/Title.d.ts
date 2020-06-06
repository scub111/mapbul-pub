declare type MultiSelectTitleProps = {
    visible: boolean;
    onClick: () => void;
    chosen: Array<string>;
    label: string;
};
export declare const MultiSelectTitle: ({ onClick, chosen, label, visible, }: MultiSelectTitleProps) => JSX.Element;
export {};
