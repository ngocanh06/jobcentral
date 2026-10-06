import { Context } from '../core/context';
/** Options subset needed by SlotCloner */
export interface SlotClonerOptions {
    ignoreElements?: (element: Element) => boolean;
    copyStyles: boolean;
}
/** Exported for reuse in document-cloner.ts */
export declare const IGNORE_ATTRIBUTE = "data-html2canvas-ignore";
/**
 * Handles shadow DOM child cloning, slot assignment, and light DOM traversal.
 * Extracted from DocumentCloner to reduce file size and improve separation of concerns.
 */
export declare class SlotCloner {
    private readonly cloneNodeFn;
    private readonly options;
    private readonly context;
    constructor(cloneNodeFn: (node: Node, copyStyles: boolean) => Node, options: SlotClonerOptions, context: Context);
    appendChildNode(clone: HTMLElement | SVGElement, child: Node, copyStyles: boolean): void;
    /**
     * Clone child nodes from source element to clone element.
     * Handles shadow DOM, slots, and light DOM appropriately.
     */
    cloneChildNodes(node: Element, clone: HTMLElement | SVGElement, copyStyles: boolean): void;
    /**
     * Check if a child node should be cloned based on filtering rules.
     * Filters out: scripts, ignored elements, and optionally styles.
     */
    private shouldCloneChild;
    /**
     * Check if a style element should be cloned based on copyStyles option.
     */
    private shouldCloneStyleElement;
    /**
     * Safely append a cloned child to a target, applying all filtering rules.
     */
    private safeAppendClonedChild;
    /**
     * Clone assigned nodes from a slot element to the target.
     */
    private cloneAssignedNodes;
    /**
     * Clone fallback content from a slot element when no nodes are assigned.
     */
    private cloneSlotFallbackContent;
    /**
     * Handle cloning of a slot element, including assigned nodes or fallback content.
     */
    private cloneSlotElement;
    /**
     * Clone shadow DOM children to the target shadow root.
     */
    private cloneShadowDOMChildren;
    /**
     * Clone light DOM children to the target element.
     */
    private cloneLightDOMChildren;
    /**
     * Clone slot element as light DOM when shadow root creation failed.
     */
    private cloneSlotElementAsLightDOM;
    /**
     * Clone shadow DOM content as light DOM when shadow root creation failed.
     * This is a fallback mechanism to ensure content is not lost.
     */
    private cloneShadowDOMAsLightDOM;
}
