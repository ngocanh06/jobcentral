/**
 * Generic LRU (Least-Recently-Used) wrapper over a native `Map`.
 *
 * Both the CSS parse cache and the background pattern cache implement the
 * same LRU eviction pattern using Map's insertion-order guarantee.  This
 * tiny utility centralises that logic so it can be reused without
 * duplication.
 *
 * Usage:
 * ```ts
 * const cache = new LRUMap<string, CanvasPattern>(50);
 * const entry = cache.get(key); // promotes if found, returns undefined otherwise
 * cache.set(key, value);         // evicts oldest entry when at capacity
 * ```
 */
export declare class LRUMap<K, V> {
    private readonly maxSize;
    private readonly _map;
    constructor(maxSize: number);
    /**
     * Get a value by key.
     * On cache hit the entry is promoted to the end of the Map (most-recently-used).
     * Returns `undefined` on miss.
     */
    get(key: K): V | undefined;
    /**
     * Insert or update a key-value pair.
     * If the key already exists it is moved to MRU position.  If the map is
     * at capacity the least-recently-used entry (oldest insertion order) is
     * evicted before inserting.
     */
    set(key: K, value: V): void;
    /** Current number of entries. */
    get size(): number;
    /** Remove all entries. */
    clear(): void;
}
