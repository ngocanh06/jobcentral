import { CSSParsedDeclaration } from '../css/index';
import { TextContainer } from './text-container';
import { Bounds } from '../css/layout/bounds';
import { Context } from '../core/context';
export interface ElementContainerOptions {
    normalizeDom?: boolean;
}
export declare class ElementContainer {
    protected readonly context: Context;
    readonly styles: CSSParsedDeclaration;
    readonly textNodes: TextContainer[];
    readonly elements: ElementContainer[];
    bounds: Bounds;
    /**
     * Bounds of the <legend> child of a <fieldset>, when present. Browsers break
     * the fieldset's top border where the legend sits; the renderer uses these
     * bounds to leave a matching gap (issue #227).
     */
    readonly legendBounds?: Bounds;
    createsStackingContext: boolean;
    createsRealStackingContext: boolean;
    isListOwner: boolean;
    debugRender: boolean;
    private originalStyles?;
    private originalElement?;
    constructor(context: Context, element: Element, options?: ElementContainerOptions);
    /**
     * Restore original element styles (if normalized)
     * Call this after rendering is complete to clean up DOM state
     */
    restore(): void;
    /**
     * Recursively restore all elements in the tree
     * Call this on the root container after rendering is complete
     */
    restoreTree(): void;
}
