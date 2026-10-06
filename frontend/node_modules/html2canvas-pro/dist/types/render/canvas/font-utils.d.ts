/**
 * Font measurement utility
 *
 * Provides Canvas API-based font measurement that works correctly with webfonts
 * (which may not be loaded in the original document) and system fonts.
 *
 * Fallback chain:
 *   1. fontBoundingBoxAscent — font-level metric (Chrome 99+, FF 116+, Safari 17.4+)
 *   2. actualBoundingBoxAscent — glyph-level metric (widely supported)
 *   3. fallback value — coarse CSS fallback
 */
export interface CanvasFontMetrics {
    baseline: number;
    height: number;
}
/**
 * Measure the baseline ascent and full font box for the currently set font.
 */
export declare const measureFontMetrics: (ctx: CanvasRenderingContext2D, fallback: number) => CanvasFontMetrics;
/**
 * Measure the baseline ascent for the currently set font.
 *
 * @param ctx - Canvas 2D rendering context with ctx.font already set
 * @param fallback - Fallback value when no metrics are available (e.g. fontSize.number)
 * @returns The distance from the text baseline to the top of the bounding box
 */
export declare const measureBaseline: (ctx: CanvasRenderingContext2D, fallback: number) => number;
