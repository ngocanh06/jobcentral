import type { CSSParsedDeclaration } from '../index';
/**
 * Read-only grouped accessor for font/text-related CSS properties.
 */
export declare class FontStyles {
    private readonly styles;
    constructor(styles: CSSParsedDeclaration);
    get family(): import("../property-descriptors/font-family").FontFamily;
    get size(): import("../types/length-percentage").LengthPercentage;
    get style(): import("../property-descriptors/font-style").FONT_STYLE;
    get variant(): string[];
    get weight(): number;
    get ligatures(): import("../property-descriptors/font-variant-ligatures").FONT_VARIANT_LIGATURES;
    get color(): number;
    get letterSpacing(): number;
    get lineHeight(): import("../syntax/parser").CSSValue;
    get textAlign(): import("../property-descriptors/text-align").TEXT_ALIGN;
    get textTransform(): import("../property-descriptors/text-transform").TEXT_TRANSFORM;
    get textOverflow(): import("../property-descriptors/text-overflow").TEXT_OVERFLOW;
    get textShadow(): import("../property-descriptors/text-shadow").TextShadow;
    get textDecorationColor(): number;
    get textDecorationLine(): import("../property-descriptors/text-decoration-line").TextDecorationLine;
    get textDecorationStyle(): import("../property-descriptors/text-decoration-style").TEXT_DECORATION_STYLE;
    get textDecorationThickness(): import("../property-descriptors/text-decoration-thickness").TextDecorationThickness;
    get textUnderlineOffset(): import("../property-descriptors/text-underline-offset").TextUnderlineOffset;
    get wordBreak(): import("../property-descriptors/word-break").WORD_BREAK;
    get lineBreak(): import("../property-descriptors/line-break").LINE_BREAK;
    get overflowWrap(): import("../property-descriptors/overflow-wrap").OVERFLOW_WRAP;
    get writingMode(): import("../property-descriptors/writing-mode").WRITING_MODE;
    get direction(): import("../property-descriptors/direction").DIRECTION;
    get webkitTextStrokeColor(): number;
    get webkitTextStrokeWidth(): number;
    get webkitLineClamp(): number;
    get paintOrder(): import("../property-descriptors/paint-order").PaintOrder;
}
