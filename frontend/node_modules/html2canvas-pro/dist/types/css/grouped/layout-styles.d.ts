import type { CSSParsedDeclaration } from '../index';
/**
 * Read-only grouped accessor for layout/display/positioning CSS properties.
 */
export declare class LayoutStyles {
    private readonly styles;
    constructor(styles: CSSParsedDeclaration);
    get display(): number;
    get position(): import("../property-descriptors/position").POSITION;
    get float(): import("../property-descriptors/float").FLOAT;
    get zIndex(): CSSParsedDeclaration['zIndex'];
    get marginTop(): import("../syntax/parser").CSSValue;
    get marginRight(): import("../syntax/parser").CSSValue;
    get marginBottom(): import("../syntax/parser").CSSValue;
    get marginLeft(): import("../syntax/parser").CSSValue;
    get paddingTop(): import("../types/length-percentage").LengthPercentage;
    get paddingRight(): import("../types/length-percentage").LengthPercentage;
    get paddingBottom(): import("../types/length-percentage").LengthPercentage;
    get paddingLeft(): import("../types/length-percentage").LengthPercentage;
    get overflowX(): import("../property-descriptors/overflow").OVERFLOW;
    get overflowY(): import("../property-descriptors/overflow").OVERFLOW;
    get opacity(): number;
    get visibility(): import("../property-descriptors/visibility").VISIBILITY;
    get transform(): import("../property-descriptors/transform").Transform;
    get transformOrigin(): import("../property-descriptors/transform-origin").TransformOrigin;
    get rotate(): import("../property-descriptors/rotate").Rotate;
    get zoom(): number;
    get clipPath(): import("../property-descriptors/clip-path").ClipPathValue;
    get mixBlendMode(): import("../property-descriptors/mix-blend-mode").MixBlendMode;
    get filter(): import("../property-descriptors/filter").FilterValue;
    get imageRendering(): import("../property-descriptors/image-rendering").IMAGE_RENDERING;
    get objectFit(): number;
    get objectPosition(): import("../property-descriptors/object-position").ObjectPosition;
    get boxDecorationBreak(): import("../property-descriptors/box-decoration-break").BOX_DECORATION_BREAK;
    get listStyleImage(): import("../types/image").ICSSImage | null;
    get listStylePosition(): import("../property-descriptors/list-style-position").LIST_STYLE_POSITION;
    get listStyleType(): import("../property-descriptors/list-style-type").LIST_STYLE_TYPE;
    get animationDuration(): number[];
    isVisible(): boolean;
    isTransparent(): boolean;
    isTransformed(): boolean;
    isPositioned(): boolean;
    isPositionedWithZIndex(): boolean;
    isFloating(): boolean;
    isInlineLevel(): boolean;
}
