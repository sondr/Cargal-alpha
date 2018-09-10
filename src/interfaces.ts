import { Carousel } from "./module/carousel";
import { Fullscreen } from "./module/fullscreen";
import { nyGalleryElement } from "./dom/utils";

export interface InyGalleryElement {
    //get ele?: HTMLElement;
    element?: HTMLElement;
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

    backgroundColor?: string;

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