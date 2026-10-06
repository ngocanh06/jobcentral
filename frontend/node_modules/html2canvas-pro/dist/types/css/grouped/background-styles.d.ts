import type { CSSParsedDeclaration } from '../index';
/**
 * Read-only grouped accessor for background-related CSS properties.
 */
export declare class BackgroundStyles {
    private readonly styles;
    constructor(styles: CSSParsedDeclaration);
    get color(): number;
    get image(): import("../types/image").ICSSImage[];
    get clip(): import("../property-descriptors/background-clip").BackgroundClip;
    get origin(): import("../property-descriptors/background-origin").BackgroundOrigin;
    get position(): import("../property-descriptors/background-position").BackgroundPosition;
    get repeat(): import("../property-descriptors/background-repeat").BackgroundRepeat;
    get size(): import("../property-descriptors/background-size").BackgroundSize;
    get blendMode(): import("../property-descriptors/background-blend-mode").BackgroundBlendMode;
}
