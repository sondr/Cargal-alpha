import { _DATA_SETS } from './../constants';
import { IMedia } from './../interfaces';
import { _PLATFORM } from './../platform';
import { _HTML } from '../constants';
import { InyGalleryElement } from '../interfaces';

export function createElement(elementTagOrElement: string | HTMLElement, classes: string, textContent?: string, attr?: string[][]) {
    let element = typeof elementTagOrElement === 'string' ? _PLATFORM.DOM.createElement(elementTagOrElement) : elementTagOrElement;
    if (classes) element.className = classes;
    if (textContent) element.textContent = textContent;
    if (attr && Array.isArray(attr)) attr.forEach(a => (<any>element)[a[0]] = a[1]);

    return element;
}

export function convertToMediaObjects(elements: (HTMLElement | HTMLElement[])[]): IMedia[] {
    return elements.map(convertToMediaObject);
}

export function convertToMediaObject(element: HTMLElement | HTMLElement[]) {
    const origin = Array.isArray(element) ? (<HTMLElement[]>element)[1] : undefined;
    const e = origin ? (<HTMLElement[]>element)[0] : <HTMLElement>element;
    //console.log("Dataset: ", element.dataset);
    return <IMedia>{
        origin: origin,
        element: e,
        title: origin ? origin.dataset[_DATA_SETS.item.title] : e.dataset[_DATA_SETS.item.title],
        description: origin ? origin.dataset[_DATA_SETS.item.description] : e.dataset[_DATA_SETS.item.description]
    };
}

export class nyGalleryElement {
    public parentElement: HTMLElement;
    private readonly element: HTMLElement;
    public readonly children?: nyGalleryElement[];
    public readonly options: InyGalleryElement;

    constructor(opts?: InyGalleryElement) {
        if (!opts!.tagName) opts!.tagName = _HTML.Tags.div;
        this.parentElement = opts!.parentElement!;
        this.options = opts!;
        this.element = createElement(opts!.element || opts!.tagName!, opts!.classes!, this.options.textContent, this.options.attr);
        //if (!opts!.element)
        opts!.element = this.element;

        this.children = this.mapChildren(opts!.children!);

        this.init();
    }

    public get Element() {
        return this.element;
    }

    public setParent(parent: HTMLElement) {
        if (!parent) return;
        this.parentElement = parent;
        if (parent) parent.appendChild(this.element);
    }

    private init() {
        if (this.options.eventListeners && this.options.eventListeners.length > 0) {
            this.options.eventListeners!.forEach(el =>
                this.element.addEventListener(el.action, <EventListenerOrEventListenerObject>el.handler))
        }

        this.setParent(this.parentElement);
    }

    private mapChildren(children: (nyGalleryElement | InyGalleryElement | undefined)[]) {
        if (!children || !Array.isArray(children)) return [];

        return children.map(child => {
            return this.appendChild(child!);
        });
    }

    public appendChild(child: nyGalleryElement | InyGalleryElement): nyGalleryElement {
        if (child instanceof nyGalleryElement) {
            if (!child.parentElement) child.setParent(this.element);
            return <nyGalleryElement>child;
        }

        child!.parentElement = this.element;
        return new nyGalleryElement(<InyGalleryElement>child);
    }

    public dispose() {
        if (this.children)
            this.children.forEach(child => {
                child.dispose();
                this.element.removeChild(child.element);
            });

        if (!this.options.eventListeners || this.options.eventListeners.length <= 0) return;

        this.options.eventListeners!.forEach(el =>
            this.element.removeEventListener(el.action, <EventListenerOrEventListenerObject>el.handler));

        if (this.parentElement) this.parentElement.removeChild(this.element);
    }

}

export function Find_Element(DOM: Document | HTMLElement, query: string) {
    let element: HTMLElement | null = null;
    query = query.trim();
    try {
        if (query.split(" ").length == 1)
            switch (query.substr(0, 1)) {
                case '#':
                    element = (<Document>DOM).getElementById ? (<Document>DOM).getElementById(query.substr(1)) : DOM.querySelector(query);
                    break;
                case '.':
                    element = DOM.getElementsByClassName(query.substr(1)).item(0) as HTMLElement;
                    break;
                default:
                    element = DOM.getElementsByTagName(query).item(0) as HTMLElement;
                    break;
            }
        else
            element = DOM.querySelector(query);

    } catch (err) { console.log(err); }

    return element;
}


export const deepObjectAssign = <T extends object = object>(target: T, ...sources: T[]): T => {
    if (!sources.length) return target;
    const source = sources.shift();
    if (source === undefined) return target;

    if (isMergebleObject(target) && isMergebleObject(source)) {
        Object.keys(source).forEach((key: string) => {
            if (isMergebleObject((<any>source)[key])) {
                if (!(<any>target)[key]) (<any>target)[key] = {};
                deepObjectAssign((<any>target)[key], (<any>source)[key]);
            } else
                (<any>target)[key] = (<any>source)[key];
        });
    }

    return deepObjectAssign(target, ...sources);
};

export function isObject(item: any): boolean {
    return item !== null && typeof item === 'object';
};

export function isMergebleObject(item: any): boolean {
    return isObject(item) && !Array.isArray(item);
};