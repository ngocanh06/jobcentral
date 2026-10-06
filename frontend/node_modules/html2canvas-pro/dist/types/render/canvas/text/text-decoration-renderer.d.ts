/**
 * Text Decoration Renderer
 *
 * Handles rendering of text-decoration lines:
 * - underline, overline, line-through
 * - solid, double, dotted, dashed, wavy styles
 * Extracted from TextRenderer to reduce file size.
 */
import { Bounds } from '../../../css/layout/bounds';
import { CSSParsedDeclaration } from '../../../css';
export declare class TextDecorationRenderer {
    private readonly ctx;
    constructor(ctx: CanvasRenderingContext2D);
    render(bounds: Bounds, styles: CSSParsedDeclaration): void;
    private draw;
    private drawPattern;
    private drawWavy;
}
