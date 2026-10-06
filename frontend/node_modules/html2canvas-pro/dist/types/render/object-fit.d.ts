import { ObjectFit } from '../css/property-descriptors/object-fit';
import { LengthPercentage } from '../css/types/length-percentage';
export interface ObjectFitBox {
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface ObjectFitRendering {
    sx: number;
    sy: number;
    sw: number;
    sh: number;
    dx: number;
    dy: number;
    dw: number;
    dh: number;
}
export declare const calculateObjectFitRendering: (intrinsicWidth: number, intrinsicHeight: number, box: ObjectFitBox, objectFit: ObjectFit, objectPosition?: [LengthPercentage, LengthPercentage]) => ObjectFitRendering;
