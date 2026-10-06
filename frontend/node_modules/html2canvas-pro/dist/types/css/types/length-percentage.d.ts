import { DimensionToken, NumberValueToken, TokenType } from '../syntax/tokenizer';
import { CSSValue, CSSFunction } from '../syntax/parser';
/**
 * Internal token representing a calc() expression that has both a percentage
 * component and a pixel offset. Created at parse time and resolved at render
 * time once the container size is known.
 *
 * Extends NumberValueToken so it is structurally assignable wherever
 * LengthPercentage (DimensionToken | NumberValueToken) is expected,
 * avoiding widespread type changes.
 */
export interface CalcWithPercentage extends NumberValueToken {
    type: TokenType.NUMBER_TOKEN;
    /** The percentage coefficient (extracted from the calc expression). */
    _calcPercentage: number;
    /** The pixel offset (extracted from the calc expression). */
    _calcPixelOffset: number;
}
export type LengthPercentage = DimensionToken | NumberValueToken;
export type LengthPercentageTuple = [LengthPercentage] | [LengthPercentage, LengthPercentage];
export declare const isLengthPercentage: (token: CSSValue) => token is LengthPercentage;
/**
 * Check if a token is a CalcWithPercentage deferred token.
 * Accepts CSSValue (structural duck-type check) for use in type guards.
 */
export declare const isCalcWithPercentage: (token: CSSValue) => token is CalcWithPercentage;
/**
 * Check if a token is a calc() function
 */
export declare const isCalcFunction: (token: CSSValue) => token is CSSFunction;
/**
 * Parse a calc() token and produce a LengthPercentage.
 *
 * Uses two-point evaluation to extract the percentage coefficient and pixel
 * offset from a calc() expression so it can be resolved later at render time
 * when the container size is known.
 *
 *   evaluate(0)   → pixelOffset
 *   evaluate(100) → percentage + pixelOffset   →  percentage = evaluate(100) - pixelOffset
 *
 * If the expression has no percentage component, returns a plain NUMBER_TOKEN
 * for backwards compatibility.
 */
export declare const parseCalcForLengthPercentage: (calcToken: CSSFunction) => LengthPercentage | null;
/**
 * Convenience helper for parsing an optional calc() or length-percentage value.
 * Used by property descriptors that accept both calc() and regular length-percentage tokens.
 * Returns null if the value is neither a calc() function nor a length-percentage token.
 */
export declare const parseOptionalCalcOrLength: (value: CSSValue) => LengthPercentage | null;
/**
 * Evaluate a calc() expression and convert to LengthPercentage token
 * Supports basic arithmetic: +, -, *, /
 * Note: Percentages in calc() are converted based on a context value
 */
export declare const evaluateCalcToLengthPercentage: (calcToken: CSSFunction, contextValue?: number) => LengthPercentage | null;
export declare const parseLengthPercentageTuple: (tokens: LengthPercentage[]) => LengthPercentageTuple;
export declare const ZERO_LENGTH: NumberValueToken;
export declare const FIFTY_PERCENT: NumberValueToken;
export declare const HUNDRED_PERCENT: NumberValueToken;
export declare const getAbsoluteValueForTuple: (tuple: LengthPercentageTuple, width: number, height: number) => [number, number];
export declare const getAbsoluteValue: (token: LengthPercentage, parent: number) => number;
