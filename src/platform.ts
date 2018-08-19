import { Options } from './config';
import { Overlay } from './dom/overlay';

export let _PLATFORM: PLATFORM;

export class PLATFORM {
    public readonly DOM: Document;
    public readonly global: Window;
    public readonly container: HTMLElement;
    public readonly overlay: Overlay;
    public readonly defaultOptions: Options;
    public readonly variables: any;

    static create(DOM: Document, global: Window, container: HTMLElement, defaultOptions: Options) {
        _PLATFORM =  new PLATFORM(DOM, global, container, defaultOptions);
        return _PLATFORM;
    }

    constructor(DOM: Document, global: Window, container: HTMLElement, defaultOptions: Options) {
        this.DOM = DOM;
        this.global = global;
        this.container = container;
        this.defaultOptions = defaultOptions;
        this.variables = {};
        _PLATFORM = this;
        this.overlay = Overlay.create();
    }
}