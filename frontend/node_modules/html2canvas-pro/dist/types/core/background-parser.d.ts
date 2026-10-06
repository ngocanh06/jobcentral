import { type Color } from '../css/types/color';
import type { Context } from './context';
/**
 * Resolve the background colour for the rendered canvas, following CSS
 * background propagation rules:
 *
 * 1. If the target element is `<html>`, inherit the first opaque ancestor
 *    (doc → body → fallback).
 * 2. Otherwise use the user-supplied backgroundColor, or opaque white.
 *
 * @param context               - Current rendering context.
 * @param element               - The root element being rendered.
 * @param backgroundColorOverride - User-supplied override (string | null).
 * @returns A resolved colour value suitable for filling the canvas.
 */
export declare const parseBackgroundColor: (context: Context, element: HTMLElement, backgroundColorOverride?: string | null) => Color;
