import { ready } from './browser/document';
import { Config, fullscreenOptions, CarouselOptions } from './interfaces';

export async function Configure(userConfig?: Config): Promise<Config> {
    let [carouselOptions, fullscreenOptions] = [<CarouselOptions>{
        autoplay: true,
        autoplay_repeat: true,
        backgroundColor: '#FFFFFF',
        opacity: undefined,
        slideInterval: 10000,
        thumbnails: true,
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
    try {
        if (query.split(" ").length == 1)
            switch (query.substr(0,1)) {
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