import { IPropertyListDescriptor } from '../property-descriptor';
import { CSSValue } from '../syntax/parser';
export interface COUNTER_INCREMENT {
    counter: string;
    increment: number;
}
export type CounterIncrement = COUNTER_INCREMENT[] | null;
/** Shared counter-ID parsing: returns next number or a fallback default. */
export declare const parseCounterValue: (tokens: CSSValue[], defaultNumber: number) => [string, number][];
export declare const counterIncrement: IPropertyListDescriptor<CounterIncrement>;
