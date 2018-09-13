import { Carousel } from "./module/carousel";
import { Fullscreen } from "./module/fullscreen";
import { CgElement } from "./dom/utils";

export interface ICreateElementObject {
    elementTagOrElement: string | HTMLElement;
    classes?: string;
    textContent?: string;
    attr?: string[][];
    //src?: string;
    //styles?: string;
}

export interface dynCssVariables {
    id: string;
    value: string;
    childValues?: dynCssVariables[]
}

export interface IcGElementStyleObject {
    id?: string | string[];
    values?: string[][];
    childValues?: IcGElementStyleObject[];
}

export interface ICgElement {
    //get ele?: HTMLElement;
    element?: HTMLElement;
    parentElement?: HTMLElement;
    tagName?: string;
    textContent?: string;
    classes?: string;
    //styles?: string[][];
    styles?: IcGElementStyleObject;
    children?: (CgElement | ICgElement | undefined)[];
    eventListeners?: InyGalleryEventListener[];
    attr?: string[][];
    removeOnDispose?: boolean;
}

export interface InyGalleryEventListener {
    action: string;
    handler: (event: UIEvent) => void;
}

export interface Config {
    document?: Document | any;
    window?: Window | any;
    rootElement?: HTMLElement | string | null,
    autoInit?: boolean;
    //enableFullScreen?: boolean;
    containerElement?: HTMLElement[] | HTMLElement | string[] | string | null,
    //media?: HTMLElement[] | HTMLElement | Media | Media[];
    defaultOptions?: Options;

    instances?: GalleryInstance[];
    Events?: ConfigEvents;
}

export interface GalleryInstance {
    instance?: IGallery;
    ContainerId?: string;
    container?: HTMLElement | string | null;
    options: Options;
    externalMedia?: HTMLElement[];
}

export interface ConfigEvents {
    onLoaded: () => IGallery;
}

export interface Options {
    Id?: string;
    enableFullScreen?: boolean;
    //autoInitiate?: boolean;

    // autoplay?: boolean;
    // autoplay_repeat?: boolean;
    // slideInterval?: number;
    lazyLoad?: boolean;

    //thumbnails?: boolean;

    Carousel?: CarouselOptions;
    Fullscreen?: fullscreenOptions;
}

export interface Media {
    type: string;
    src: string;
    srcset: string;
}

export interface CarouselOptions {
    autoplay?: boolean;
    autoplay_repeat?: boolean;
    slideInterval?: number;

    thumbnails?: boolean;

    padding?: string;
    backgroundColor?: string;
    overlayBackground?: string;
    color?: string;

    btns?: btnOptions;
    // btnColor?: string;
    // btnColorHover?: string;
    // btnBackground?: string;
    // btnBackgroundHover?: string;

    //opacity?: number;

    Events?: CarouselEvents;
}

export interface btnOptions {
    color?: string;
    hover?: string;
    background?: string;
    backgroundHover?: string;
}

export interface fullscreenOptions {
    background?: string;
    color?: string;
    opacity?: number;
    //menuBarFixed?: boolean;
    Events?: FullscreenEvents;
    Carousel?: CarouselOptions;
    btns?: btnOptions;
    //text?: textOptions;
    Menubar?: menubarOptions;
    title?: IElementCssOptions;
    description?: IElementCssOptions;
}

export interface IElementCssOptions {
    color?: string;
    background?: string;
}

export interface menubarOptions {
    fixed?: boolean;
    background?: string;
    indicator?: boolean | [string, string?];
    // title: string | string[];
    // description: string | string[];
}

export interface CarouselEvents {
    onEnd?: any;
    onChange?: any;
    onStop?: any;
    onStart?: any;
}

export interface FullscreenEvents extends CarouselEvents {
    onShow?: any;
    onClose?: any;
}

export interface IGallery {
    Id: number;
    options?: Options;
    containerId?: string;
    container: HTMLElement;
    media: IMedia[];
    externalMedia: IMedia[];
    Carousel?: Carousel;
    Fullscreen?: Fullscreen;
}

export interface IMedia {
    handler?: any;
    origin?: HTMLElement;
    element: HTMLElement;
    type?: string;
    title: string;
    description: string;
}

// export interface IMedia {
//     type: string;
//     src: string;
//     srcXl: string;
// }