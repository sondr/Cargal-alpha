import { CarouselOptions, fullscreenOptions } from './config';
import { ready } from './browser/document';
import { IGallery } from './gallery';

export async function Configure(userConfig?: Config): Promise<Config> {
    let [carouselOptions, fullscreenOptions] = [<CarouselOptions>{
        autoplay: true,
        autoplay_repeat: true,
        backgroundColor: '#FFFFFF',
        opacity: undefined,
        slideInterval: 10000,
        thumbnails: false,
        Events: undefined,
    }, <fullscreenOptions>{
        menuBarFixed: true,
        opacity: 0.95,
        autoplay: false,
        autoplay_repeat: false,
        backgroundColor: '#222',
        slideInterval: 10000,
        thumbnails: true,
        Events: undefined,
    }
    ];

    // let configEvents: ConfigEvents = {
    //     onLoaded: () => { return <IGallery>[] }
    // };

    let cfg: Config = {
        window: window!,
        autoInitCarousels: true,
        options: {
            lazyLoad: true
        }
    };

    cfg = Object.assign({}, cfg, userConfig || {});
    cfg.options!.carousel = Object.assign({}, carouselOptions, cfg.options!.carousel || {});
    cfg.options!.fullscreen = Object.assign({}, fullscreenOptions, cfg.options!.fullscreen || {});

    cfg.document = await ready(cfg.document);
    if (cfg.rootElement)
        if (typeof cfg.rootElement === 'string')
            Find_Element(cfg.document, cfg.rootElement);
    if (!cfg.containerElement) cfg.containerElement = cfg.document.body;

    return cfg;
};

export function Find_Element(DOM: Document | HTMLElement, query: string) {
    let element: HTMLElement | null = null;
    query = query.trim();
    console.log(element, query);
    try {
        if (query.split(" ").length == 1)
            switch (query) {
                case '#':
                    element = (<Document>DOM).getElementById ? (<Document>DOM).getElementById(query.substr(1)) : DOM.querySelector(query);
                    break;
                case '.':
                    element = DOM.getElementsByClassName(query.substr(1)).item(0) as HTMLElement;
                    break;
                default:
                    element = DOM.getElementsByTagName(query.substr(1)).item(0) as HTMLElement;
                    break;
            }
        else
            element = DOM.querySelector(query);

    } catch (err) { console.log(err); }

    return element;
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