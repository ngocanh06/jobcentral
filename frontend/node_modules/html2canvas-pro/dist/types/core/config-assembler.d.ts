import type { Options } from '../options';
import type { Html2CanvasConfig } from '../config';
import type { ResourceOptions } from './cache-storage';
import type { ContextOptions } from './context';
import type { CloneConfigurations } from '../dom/document-cloner';
import type { RenderConfigurations } from '../render/canvas/canvas-renderer';
/**
 * Coerce known numeric options from string (or other) values to actual numbers.
 * Mutates the opts object in place — this is intentionally a normalisation
 * (not pure) step that runs once at the beginning of renderElement.
 */
export declare const coerceNumberOptions: (opts: Partial<Options>) => void;
/** Assemble resource loading options from user-provided Options. */
export declare const assembleResourceOptions: (opts: Partial<Options>) => ResourceOptions;
/** Assemble context (logging + cache) options, extending resource options. */
export declare const assembleContextOptions: (opts: Partial<Options>, config: Html2CanvasConfig, resourceOptions: ResourceOptions) => ContextOptions;
/** Assemble window / viewport options. */
export interface AssembledWindowOptions {
    windowWidth: number;
    windowHeight: number;
    scrollX: number;
    scrollY: number;
}
export declare const assembleWindowOptions: (opts: Partial<Options>, defaultView: Window) => AssembledWindowOptions;
/** Assemble DOM cloning options. */
export declare const assembleCloneOptions: (opts: Partial<Options>, config: Html2CanvasConfig, foreignObjectRendering: boolean) => CloneConfigurations;
/** Assemble canvas rendering options. */
export declare const assembleRenderOptions: (opts: Partial<Options>, backgroundColor: number | null, left: number, top: number, width: number, height: number, devicePixelRatio: number) => RenderConfigurations;
