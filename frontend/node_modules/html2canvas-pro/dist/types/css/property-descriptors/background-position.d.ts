import { IPropertyListDescriptor } from '../property-descriptor';
import { LengthPercentageTuple } from '../types/length-percentage';
export type BackgroundPosition = BackgroundImagePosition[];
export type BackgroundImagePosition = LengthPercentageTuple;
export declare const backgroundPosition: IPropertyListDescriptor<BackgroundPosition>;
