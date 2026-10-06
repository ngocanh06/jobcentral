import { IPropertyIdentValueDescriptor } from '../property-descriptor';
export declare const enum WRITING_MODE {
    HORIZONTAL_TB = 0,
    VERTICAL_RL = 1,
    VERTICAL_LR = 2,
    SIDEWAYS_RL = 3,
    SIDEWAYS_LR = 4
}
export declare const isVerticalWritingMode: (writingMode: WRITING_MODE) => boolean;
export declare const isSidewaysWritingMode: (writingMode: WRITING_MODE) => boolean;
export declare const writingMode: IPropertyIdentValueDescriptor<WRITING_MODE>;
