/**
 * Effects Renderer
 *
 * Handles rendering effects including:
 * - Opacity effects
 * - Transform effects (matrix transformations)
 * - Clip effects (overflow / border-radius clipping via Path[])
 * - Clip-path effects (CSS clip-path shapes: inset, circle, ellipse, polygon, path)
 * - Blend effects (mix-blend-mode)
 * - Filter effects (CSS filter functions)
 */
import { IElementEffect } from '../effects';
import { Path } from '../path';
/**
 * Dependencies required for EffectsRenderer
 */
export interface EffectsRendererDependencies {
    ctx: CanvasRenderingContext2D;
}
/**
 * Path callback for clip effects
 */
export interface EffectsPathCallback {
    path(paths: Path[]): void;
}
/**
 * Effects Renderer
 *
 * Manages rendering effects stack including opacity, transforms, and clipping.
 * Extracted from CanvasRenderer to improve code organization and maintainability.
 *
 * ## Save/restore optimisation
 *
 * Canvas `save()` / `restore()` snapshot and restore the entire canvas state
 * (transform matrix, clip region, compositing mode, filter, shadow, …) which
 * is relatively expensive. The old implementation called `save()` / `restore()`
 * for every single effect unconditionally.
 *
 * This implementation does a **batch pre-scan** before applying effects:
 *
 * | Effect type        | Modifies             | Reversible?   | Needs save? |
 * |--------------------|----------------------|---------------|-------------|
 * | TransformEffect     | transform matrix     | ❌ irreversible | **YES**     |
 * | ClipEffect         | clip region          | ❌ cumulative   | **YES**     |
 * | ClipPathEffect     | clip region          | ❌ cumulative   | **YES**     |
 * | OpacityEffect      | globalAlpha          | ✅ scalar       | NO          |
 * | BlendEffect        | globalCompositeOp    | ✅ scalar       | NO          |
 * | FilterEffect       | filter + shadow      | ✅ string+vec   | NO          |
 *
 * When the batch contains *only* lightweight effects (opacity / blend / filter)
 * we skip `save()` entirely and manually reset properties on pop.
 *
 * When the batch contains at least one heavyweight effect (transform / clip /
 * clip-path) we call `save()` **once** before the first heavyweight effect and
 * `restore()` **once** when that effect is popped.
 */
export declare class EffectsRenderer {
    private readonly ctx;
    private readonly pathCallback;
    private readonly activeEffects;
    /** Whether a canvas state save was performed for the current batch. */
    private didSave;
    /** Index (0-based, from start of activeEffects array) of the last
     *  heavyweight effect in the batch — the one whose pop triggers
     *  restore(). Set to -1 when no save was performed. */
    private saveAtDepth;
    constructor(deps: EffectsRendererDependencies, pathCallback: EffectsPathCallback);
    /**
     * Apply multiple effects.
     * Clears existing effects and applies new ones.
     */
    applyEffects(effects: IElementEffect[]): void;
    /**
     * Apply a single effect (called internally by applyEffects).
     */
    private applyEffect;
    /**
     * Remove the most recent effect.
     * Restores canvas state if needed.
     */
    private popEffect;
    /**
     * Get the current number of active effects.
     */
    getActiveEffectCount(): number;
    /**
     * Check if there are any active effects.
     */
    hasActiveEffects(): boolean;
}
