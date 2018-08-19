import { _PLATFORM } from './../platform';

export function createElement(elementTag: string, classes: string, textContent?:string) {
    let element = _PLATFORM.DOM.createElement(elementTag);
    if (classes) element.className = classes;
    if(textContent) element.textContent = textContent;

    return element;
}


export class nyGalleryElement {
    public readonly parentElement: HTMLElement;
    public readonly element: HTMLElement;
    public readonly children?: nyGalleryElement[];
    public readonly options: InyGalleryElement;

    constructor(opts: InyGalleryElement) {
        if (!opts.tagName) opts.tagName = 'div';
        this.parentElement = opts.parentElement!;
        this.options = opts;
        this.element = createElement(opts.tagName, opts.classes!, this.options.textContent);

        this.children = this.mapChildren(opts.children!);

        this.init();
    }

    private init() {
        if (this.options.eventListeners && this.options.eventListeners.length > 0) {
            this.options.eventListeners!.forEach(el =>
                this.element.addEventListener(el.action, el.handler));
        }

        if (this.parentElement) this.parentElement.appendChild(this.element);
    }

    private mapChildren(children: (nyGalleryElement | InyGalleryElement)[]) {
        if (!children || !Array.isArray(children)) return [];

        return children.map(child => {
            if (child instanceof nyGalleryElement) return <nyGalleryElement>child;

            child.parentElement = this.element;
            let c = new nyGalleryElement(<InyGalleryElement>child);
            return c;
        });
    }

    // public appendChild(galleryElementOrOptions: nyGalleryElement | InyGalleryElement){
    //     if(galleryElementOrOptions instanceof nyGalleryElement)
    // }

    public dispose() {
        if (this.children)
            this.children.forEach(child => {
                child.dispose();
                this.element.removeChild(child.element);
            });

        if (!this.options.eventListeners || this.options.eventListeners.length <= 0) return;

        this.options.eventListeners!.forEach(el =>
            this.element.removeEventListener(el.action, el.handler));

        if (this.parentElement) this.parentElement.removeChild(this.element);
    }

}

export interface InyGalleryElement {
    parentElement?: HTMLElement;
    tagName?: string;
    textContent?: string;
    classes?: string;
    children?: (nyGalleryElement | InyGalleryElement)[];
    eventListeners?: InyGalleryEventListener[];
}

interface InyGalleryEventListener {
    action: string;
    handler: EventListenerOrEventListenerObject;
}