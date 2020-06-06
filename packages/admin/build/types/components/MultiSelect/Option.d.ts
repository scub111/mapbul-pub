declare type OptionProps = {
    onChange: () => void;
    value: boolean;
    label: string;
    style?: object;
    disabled?: boolean;
};
export declare const MultiSelectOption: ({ value, onChange, label, style, disabled, }: OptionProps) => JSX.Element;
export {};
