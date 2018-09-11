import { _DATA_SETS } from './../constants';
import { IMedia, ICreateElementObject } from './../interfaces';
import { _PLATFORM } from './../platform';
import { _HTML } from '../constants';
import { ICgElement } from '../interfaces';



//export function createElement(elementTagOrElement: string | HTMLElement, classes: string, textContent?: string, attr?: string[][]) {
export function createElement(createObject: ICreateElementObject) {
    let element = typeof createObject.elementTagOrElement === 'string' ? _PLATFORM.DOM.createElement(createObject.elementTagOrElement) : createObject.elementTagOrElement;
    if (createObject.classes) element.className += `${createObject.classes}`;
    //if (createObject.styles) element.setAttribute('style', createObject.styles);
    if (createObject.textContent) element.textContent = createObject.textContent;
    if (createObject.attr && Array.isArray(createObject.attr)) createObject.attr.forEach(a => (<any>element)[a[0]] = a[1]);

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

export class CgElement {
    public parentElement: HTMLElement;
    private readonly element: HTMLElement;
    public readonly children?: CgElement[];
    public readonly options: ICgElement;

    constructor(opts?: ICgElement) {
        if (!opts!.tagName) opts!.tagName = _HTML.Tags.div;
        this.parentElement = opts!.parentElement!;
        this.options = opts!;
        if (this.options.styles) {
            const dynamicStyleClass = _PLATFORM.styleSheet.appendStyle(this.options.styles);
            if (!this.options.classes) this.options.classes = '';
            this.options.classes += ` ${dynamicStyleClass}`;
        }
        this.element = createElement({
            elementTagOrElement: opts!.element || opts!.tagName!,
            classes: this.options!.classes!,
            textContent: this.options.textContent,
            attr: this.options.attr,
            //styles:opts!.styles
        });
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

    private mapChildren(children: (CgElement | ICgElement | undefined)[]) {
        if (!children || !Array.isArray(children)) return [];

        return children.map(child => {
            return this.appendChild(child!);
        });
    }

    public appendChild(child: CgElement | ICgElement): CgElement {
        if (child instanceof CgElement) {
            if (!child.parentElement) child.setParent(this.element);
            return <CgElement>child;
        }

        child!.parentElement = this.element;
        return new CgElement(<ICgElement>child);
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


export function Get_YoutubeImg(id: string, quality?: number) {
    let resolutions = ['hq', 'sd', 'maxres'];
    if (typeof quality != 'number') quality = 1;
    else if (quality < 0) quality = 0;
    else if (quality > resolutions.length - 1) quality = resolutions.length - 1;

    return `https://img.youtube.com/vi/${id}/${resolutions[quality]}default.jpg`
}