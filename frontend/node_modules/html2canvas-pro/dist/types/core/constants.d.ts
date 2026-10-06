/**
 * Shared numeric constants used across html2canvas-pro.
 * Centralising magic numbers for maintainability.
 */
/** Maximum entries in the CSS parse cache per descriptor (LRU). */
export declare const PARSE_CACHE_MAX_PER_DESCRIPTOR = 200;
/** Maximum cached background-image patterns per render session (LRU). */
export declare const PATTERN_CACHE_MAX = 50;
/** Maximum size of the image-resource cache (entries). */
export declare const DEFAULT_IMAGE_CACHE_SIZE = 100;
/** Maximum allowed image-resource cache size. */
export declare const MAX_IMAGE_CACHE_SIZE = 10000;
/** Default image-load timeout in milliseconds. */
export declare const DEFAULT_IMAGE_TIMEOUT_MS = 15000;
/** Z-axis mask offset used during box-shadow rendering. */
export declare const SHADOW_MASK_OFFSET = 10000;
/** Polling interval (ms) when waiting for the cloned iframe to become ready. */
export declare const IFRAME_READY_POLL_MS = 50;
/** Deferred resolution delay (ms) for inline XML images that may fail to parse. */
export declare const INLINE_IMAGE_RESOLVE_DELAY_MS = 500;
/** Maximum characters logged for image/resource keys. */
export declare const RESOURCE_KEY_LOG_LENGTH = 256;
