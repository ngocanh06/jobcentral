import { RenderConfigurations } from './canvas-renderer';
import { Context } from '../../core/context';
export declare class ForeignObjectRenderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    options: RenderConfigurations;
    private readonly context;
    constructor(context: Context, options: RenderConfigurations);
    render(element: HTMLElement): Promise<HTMLCanvasElement>;
}
