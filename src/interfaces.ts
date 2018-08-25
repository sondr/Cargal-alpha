import { Carousel } from "./module/carousel";
import { Fullscreen } from "./module/fullscreen";
import { nyGalleryElement } from "./dom/utils";

export interface InyGalleryElement {
    parentElement?: HTMLElement;
    tagName?: string;
    textContent?: string;
    classes?: string;
    children?: (nyGalleryElement | InyGalleryElement | undefined)[];
    eventListeners?: InyGalleryEventListener[];
    attr?: string[][];
}

export interface InyGalleryEventListener {
    action: string;
    handler: EventListenerOrEventListenerObject;
}

export interface Config {
    document?: Document | any;
    window?: Window | any;
    autoInitCarousels?: boolean;
    rootElement?: HTMLElement | string | null,
    containerElement?: HTMLElement[] | HTMLElement | string[] | string | null,
    //media?: HTMLElement[] | HTMLElement | Media | Media[];
    options?: Options

    Events?: ConfigEvents;
}

export interface ConfigEvents{
    onLoaded: () => IGallery;
}

export interface Options {
    Id?: string;

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

    backgroundColor?: string;

    btnColor?: string;
    btnBackgroundColor: string;

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

export interface IClassNames {
    active: string;
    hidden: string;
    fixed: string;

    btnContainer: string;


    carouselContainer: string; //'ny-gallery-container'
    carouselOuter: string;
    carouselInner: string;

    thumbnailContainer: string;
    thumbnailItem: string;

    overlay: string;

    fullscreenContainer: string;
    fullscreenGallery: string;

    fullscreenMenuBar: string;
    fullscreenMenuBarTitle: string;
    fullscreenMenuBarBtnGroup: string;
    fullscreenMenuBarBtn: string;

    externalIncludeImage: string;


    preventScroll: string;

    iconClose: string;
    chevron: string;

    left: string;
    right: string;
    up: string;
    down: string;

    item: string;

    [key: string]: string | undefined;
}

export interface IGallery {
    options?: Options,
    container: HTMLElement, 
    media: HTMLDivElement[], 
    externalMedia: HTMLDivElement[],
    Carousel?: Carousel;
    Fullscreen?: Fullscreen;
}

export interface IMedia{
    type: string;
    src: string;
    srcXl: string;
}