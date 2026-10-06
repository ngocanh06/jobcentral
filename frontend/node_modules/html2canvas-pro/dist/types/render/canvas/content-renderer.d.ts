import { ElementPaint } from '../stacking-context';
import { ReplacedElementContainer } from '../../dom/replaced-elements';
import { ElementContainer } from '../../dom/element-container';
import { Bounds } from '../../css/layout/bounds';
import { BoundCurves } from '../bound-curves';
import { Vector } from '../vector';
import { Context } from '../../core/context';
import { TextRenderer } from './text-renderer';
import { Color } from '../../css/types/color';
import { CSSParsedDeclaration } from '../../css/index';
/**
 * Factory type for creating an iframe canvas renderer — avoids circular import
 * from canvas-renderer.ts which in turn imports content-renderer.ts.
 */
type IframeRendererFactory = (context: Context, options: {
    scale: number;
    backgroundColor: Color | null;
    x: number;
    y: number;
    width: number;
    height: number;
}) => {
    render: (element: ElementContainer) => Promise<HTMLCanvasElement>;
};
/**
 * Render replaced elements: Image, Canvas, SVG, IFrame.
 */
export declare function renderReplacedElements(ctx: CanvasRenderingContext2D, context: Context, options: {
    scale: number;
    backgroundColor: Color | null;
    x: number;
    y: number;
    width: number;
    height: number;
}, iframeRendererFactory: IframeRendererFactory, container: ElementContainer, curves: BoundCurves, styles: CSSParsedDeclaration, renderReplacedElementFn: (container: ReplacedElementContainer, curves: BoundCurves, image: HTMLImageElement | HTMLCanvasElement) => void): Promise<void>;
/**
 * Render form element content: checkbox, radio, text input.
 */
export declare function renderFormElements(ctx: CanvasRenderingContext2D, textRenderer: TextRenderer, pathFn: (paths: Vector[]) => void, container: ElementContainer, styles: CSSParsedDeclaration): void;
/**
 * Native single-line inputs may paint value text into their padding area when
 * fixed height and vertical padding leave a content box shorter than the font.
 * Preserve the content box horizontally, but avoid clipping those glyphs to the
 * collapsed vertical content box.
 * @internal exported for testing
 */
export declare const inputTextClipBounds: (contentBounds: Bounds, inputPaddingBox: Bounds, fontHeight: number) => Bounds;
/**
 * Split text into lines that fit the given pixel width, preserving hard line
 * breaks and (when wrapping is enabled) breaking at word boundaries — mirroring
 * how a <textarea> lays out its value.
 * @internal exported for testing
 */
export declare const wrapTextToWidth: (ctx: CanvasRenderingContext2D, text: string, maxWidth: number, noWrap: boolean) => string[];
/**
 * Render list-item marker (image or text).
 */
export declare function renderListMarker(ctx: CanvasRenderingContext2D, context: Context, textRenderer: TextRenderer, paint: ElementPaint, container: ElementContainer, styles: CSSParsedDeclaration): Promise<void>;
export {};
