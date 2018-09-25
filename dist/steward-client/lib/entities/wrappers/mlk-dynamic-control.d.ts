/**
 * Represents dynamic html controls (Input, TextArea and Select)
 */
export declare class MlkDynamicControl<T> {
    /**
     * Control label
     */
    label: string;
    /**
     * Icon to be appended before the control (supports class defined icons)
     */
    icon: string;
    /**
     * Name of the control (provide variable valid names ie. no spaces prefarably api corresponding names e.g. userName)
     */
    name: string;
    /**
     * The actual control (MlkInput, MlkTextArea & MlkSelect)
     */
    controlType: T;
    /**
     * Checks if the field is required
     */
    isRequired: boolean;
    /**
     * Control placeholder
     */
    placeholder: string;
    constructor(label: string, name: string, controlType: T, icon?: string, isRequired?: boolean, placeholder?: string);
}
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
export declare class MlkInput {
    /**
     * Type of input e.g. text, number, date
     */
    type: string;
    /**
     * Used to validate length of the input
     */
    maxLength: number;
    /**
     * Used to validate minimum input length
     */
    minLength: number;
    /**
     * Used to validate number inputs
     */
    min: number;
    /**
     * Used to validate number inputs
     */
    max: number;
    constructor(type?: string);
}
/**
 * Represents html textarea input
 */
export declare class MlkTextarea {
    /**
     * Number textarea columns
     */
    cols?: number;
    /**
     * Number of textarea rows
     */
    rows?: number;
    /**
     * Validate maximum input length
     */
    maxLength: number;
    /**
     * Validate minimum input length
     */
    minLength: number;
    constructor(cols?: number, rows?: number);
}
/**
 * Represents html select control
 */
export declare class MlkSelect {
    /**
     * Select options
     */
    options: Array<MlkSelectOption>;
    constructor(options: Array<MlkSelectOption>);
}
export declare class MlkSelectOption {
    /**
     * Option value
     */
    value: string;
    /**
     * Option text/label
     */
    text: string;
    constructor(value: string, text?: string);
}
