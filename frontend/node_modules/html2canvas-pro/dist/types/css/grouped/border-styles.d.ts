import type { CSSParsedDeclaration } from '../index';
/**
 * Read-only grouped accessor for border-related CSS properties.
 *
 * Provides structured access: `styles.border.topColor` as an alternative
 * to the flat `styles.borderTopColor`. Both forms remain valid.
 */
export declare class BorderStyles {
    private readonly styles;
    constructor(styles: CSSParsedDeclaration);
    get topColor(): number;
    get rightColor(): number;
    get bottomColor(): number;
    get leftColor(): number;
    get topStyle(): import("../property-descriptors/border-style").BORDER_STYLE;
    get rightStyle(): import("../property-descriptors/border-style").BORDER_STYLE;
    get bottomStyle(): import("../property-descriptors/border-style").BORDER_STYLE;
    get leftStyle(): import("../property-descriptors/border-style").BORDER_STYLE;
    get topWidth(): number;
    get rightWidth(): number;
    get bottomWidth(): number;
    get leftWidth(): number;
    get topLeftRadius(): import("../types/length-percentage").LengthPercentageTuple;
    get topRightRadius(): import("../types/length-percentage").LengthPercentageTuple;
    get bottomRightRadius(): import("../types/length-percentage").LengthPercentageTuple;
    get bottomLeftRadius(): import("../types/length-percentage").LengthPercentageTuple;
    get imageSource(): import("../property-descriptors/border-image-source").BorderImageSource;
    get imageSlice(): import("../property-descriptors/border-image-slice").BorderImageSlice;
    get imageRepeat(): import("../property-descriptors/border-image-repeat").BorderImageRepeat;
    get boxShadow(): import("../property-descriptors/box-shadow").BoxShadow;
}
