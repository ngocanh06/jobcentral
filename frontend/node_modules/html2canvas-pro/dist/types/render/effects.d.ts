import { Matrix } from '../css/property-descriptors/transform';
import { MixBlendMode } from '../css/property-descriptors/mix-blend-mode';
import { Path } from './path';
export declare const enum EffectType {
    TRANSFORM = 0,
    CLIP = 1,
    OPACITY = 2,
    CLIP_PATH = 3,
    BLEND = 4,
    FILTER = 5
}
export declare const enum EffectTarget {
    BACKGROUND_BORDERS = 2,
    CONTENT = 4
}
export interface IElementEffect {
    readonly type: EffectType;
    readonly target: number;
}
export declare class TransformEffect implements IElementEffect {
    readonly offsetX: number;
    readonly offsetY: number;
    readonly matrix: Matrix;
    readonly type: EffectType;
    readonly target: number;
    constructor(offsetX: number, offsetY: number, matrix: Matrix);
}
export declare class ClipEffect implements IElementEffect {
    readonly path: Path[];
    readonly target: EffectTarget;
    readonly type: EffectType;
    constructor(path: Path[], target: EffectTarget);
}
export declare class OpacityEffect implements IElementEffect {
    readonly opacity: number;
    readonly type: EffectType;
    readonly target: number;
    constructor(opacity: number);
}
/**
 * Clips the element and all its descendants to an arbitrary canvas-drawn shape.
 * The `applyClip` callback is responsible for calling beginPath, the shape
 * operations, and ctx.clip() — giving each shape type full control over how
 * the path is constructed (arc, ellipse, lineTo, Path2D, etc.).
 */
export declare class ClipPathEffect implements IElementEffect {
    readonly applyClip: (ctx: CanvasRenderingContext2D) => void;
    readonly type: EffectType;
    readonly target: number;
    constructor(applyClip: (ctx: CanvasRenderingContext2D) => void);
}
export declare class BlendEffect implements IElementEffect {
    readonly mixBlendMode: MixBlendMode;
    readonly type: EffectType;
    readonly target: number;
    readonly compositeOperation: GlobalCompositeOperation;
    constructor(mixBlendMode: MixBlendMode);
}
export declare class FilterEffect implements IElementEffect {
    readonly type: EffectType;
    readonly target: number;
    /** CSS filter string with drop-shadow() stripped (safe for ctx.filter). */
    readonly safeFilterString: string;
    /** Shadow params for drop-shadow(), if present and successfully parsed. */
    readonly shadow?: {
        offsetX: number;
        offsetY: number;
        blur: number;
        color: string;
    };
    constructor(filterString: string);
    /**
     * Parse a CSS filter string, extracting drop-shadow() parameters for
     * rendering via ctx.shadow* (which avoids canvas taint), and producing
     * a safe filter string with all drop-shadow() calls removed.
     *
     * Uses paren-depth tracking to correctly handle nested function
     * arguments — e.g. rgba() / hsla() inside drop-shadow() — which
     * the previous regex-based approach ([^)]+) could not handle.
     *
     * Per CSS spec the shadow value is: <color>? && <length>{2,3}
     * (components can appear in any order).
     */
    private static parseDropShadow;
    /**
     * Find all drop-shadow() function calls in a CSS filter string.
     * Uses paren-depth tracking to correctly skip over nested
     * parentheses (e.g. rgba(0, 0, 0, 0.15)).
     */
    private static findDropShadows;
    /**
     * Parse the body of a single drop-shadow() function.
     * Body format (order-independent): <offsetX> <offsetY> [<blur>] [<color>?]
     */
    private static parseDropShadowBody;
    /**
     * Split whitespace-separated tokens while keeping parenthesised
     * expressions intact.
     *
     * e.g. "rgba(0, 0, 0, 0.15) 0px 1px 2px"
     *   → ["rgba(0, 0, 0, 0.15)", "0px", "1px", "2px"]
     */
    private static tokenizeFilterArgs;
    /** True when token looks like a CSS length: number with optional unit. */
    private static isCSSLength;
}
export declare const isTransformEffect: (effect: IElementEffect) => effect is TransformEffect;
export declare const isClipEffect: (effect: IElementEffect) => effect is ClipEffect;
export declare const isOpacityEffect: (effect: IElementEffect) => effect is OpacityEffect;
export declare const isClipPathEffect: (effect: IElementEffect) => effect is ClipPathEffect;
export declare const isBlendEffect: (effect: IElementEffect) => effect is BlendEffect;
export declare const isFilterEffect: (effect: IElementEffect) => effect is FilterEffect;
