import { CSSValue } from './syntax/parser';
import { CSSTypes } from './types';
import { Context } from '../core/context';
export declare const enum PropertyDescriptorParsingType {
    VALUE = 0,
    LIST = 1,
    IDENT_VALUE = 2,
    TYPE_VALUE = 3,
    TOKEN_VALUE = 4
}
export interface IPropertyDescriptor {
    name: string;
    type: PropertyDescriptorParsingType;
    initialValue: string;
    prefix: boolean;
    /** When true, the parse result is never stored in parseCache.
     *  Set this for descriptors whose parse() has side effects (e.g.,
     *  calling context.cache.addImage) that must run on every render pass. */
    skipCache?: boolean;
}
export interface IPropertyIdentValueDescriptor<T> extends IPropertyDescriptor {
    type: PropertyDescriptorParsingType.IDENT_VALUE;
    parse: (context: Context, token: string) => T;
}
export interface IPropertyTypeValueDescriptor extends IPropertyDescriptor {
    type: PropertyDescriptorParsingType.TYPE_VALUE;
    format: CSSTypes;
}
export interface IPropertyValueDescriptor<T> extends IPropertyDescriptor {
    type: PropertyDescriptorParsingType.VALUE;
    parse: (context: Context, token: CSSValue) => T;
}
export interface IPropertyListDescriptor<T> extends IPropertyDescriptor {
    type: PropertyDescriptorParsingType.LIST;
    parse: (context: Context, tokens: CSSValue[]) => T;
}
export interface IPropertyTokenValueDescriptor extends IPropertyDescriptor {
    type: PropertyDescriptorParsingType.TOKEN_VALUE;
}
export type CSSPropertyDescriptor<T> = IPropertyValueDescriptor<T> | IPropertyListDescriptor<T> | IPropertyIdentValueDescriptor<T> | IPropertyTypeValueDescriptor | IPropertyTokenValueDescriptor;
