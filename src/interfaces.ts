import { Gallery } from './gallery';
import { Carousel } from "./module/carousel";
import { Fullscreen } from "./module/fullscreen";
import { CgElement } from "./dom/utils";

export interface ICreateElementObject {
    elementTagOrElement: string | HTMLElement;
    classes: string;
    textContent?: string;
    attr?: string[][];
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

    carousel?: CarouselOptions;
    fullscreen?: fullscreenOptions;
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
    color?: string;

    btnColor?: string;
    btnBackgroundColor?: string;

    opacity?: number;

    Events?: CarouselEvents;
}

export interface fullscreenOptions extends CarouselOptions {
    menuBarFixed?: boolean;
    Events?: FullscreenEvents;
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