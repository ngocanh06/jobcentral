import { IPropertyListDescriptor } from '../property-descriptor';
export interface BorderImageSlice {
    top: number;
    right: number;
    bottom: number;
    left: number;
    fill: boolean;
    unit: 'number' | 'percent';
}
export declare const borderImageSlice: IPropertyListDescriptor<BorderImageSlice>;
