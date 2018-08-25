import { _PLATFORM } from './../platform';
import { _HTML } from '../constants';
import { InyGalleryElement } from '../interfaces';

export function createElement(elementTag: string, classes: string, textContent?: string, attr?: string[][]) {
    let element = _PLATFORM.DOM.createElement(elementTag);
    if (classes) element.className = classes;
    if (textContent) element.textContent = textContent;
    if (attr && Array.isArray(attr)) attr.forEach(a => (<any>element)[a[0]] = a[1]);

    return element;
}


export class nyGalleryElement {
    public parentElement: HTMLElement;
    public readonly element: HTMLElement;
    public readonly children?: nyGalleryElement[];
    public readonly options: InyGalleryElement;

    constructor(opts?: InyGalleryElement) {
        if (!opts!.tagName) opts!.tagName = _HTML.Tags.div;
        this.parentElement = opts!.parentElement!;
        this.options = opts!;
        this.element = createElement(opts!.tagName!, opts!.classes!, this.options.textContent, this.options.attr);

        this.children = this.mapChildren(opts!.children!);

        this.init();
    }

    public setParent(parent: HTMLElement){
        if(!parent) return;
        this.parentElement = parent;
        if(parent) parent.appendChild(this.element);
    }

    private init() {
        if (this.options.eventListeners && this.options.eventListeners.length > 0) {
            this.options.eventListeners!.forEach(el =>
                this.element.addEventListener(el.action, el.handler));
        }

        this.setParent(this.parentElement);
    }

    private mapChildren(children: (nyGalleryElement | InyGalleryElement | undefined)[]) {
        if (!children || !Array.isArray(children)) return [];

        return children.map(child => {
            if (child instanceof nyGalleryElement){ 
                if(!child.parentElement) child.setParent(this.element);
                return <nyGalleryElement>child;
            }

            child!.parentElement = this.element;
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