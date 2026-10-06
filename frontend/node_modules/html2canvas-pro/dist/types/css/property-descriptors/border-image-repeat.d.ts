import { IPropertyListDescriptor } from '../property-descriptor';
export declare enum BORDER_IMAGE_REPEAT {
    STRETCH = 0,
    REPEAT = 1,
    ROUND = 2,
    SPACE = 3
}
export interface BorderImageRepeat {
    horizontal: BORDER_IMAGE_REPEAT;
    vertical: BORDER_IMAGE_REPEAT;
}
export declare const borderImageRepeat: IPropertyListDescriptor<BorderImageRepeat>;
