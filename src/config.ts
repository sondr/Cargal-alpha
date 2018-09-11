import { ready } from './browser/document';
import { Config, fullscreenOptions, CarouselOptions } from './interfaces';
import { Find_Element } from './dom/utils';

//export async function Configure(userConfig?: Config): Promise<Config> {
export function Configure(userConfig?: Config): Config {
    let [carouselOptions, fullscreenOptions] = [<CarouselOptions>{
        autoplay: true,
        autoplay_repeat: true,
        backgroundColor: '#FFFFFF',
        opacity: undefined,
        slideInterval: 10000,
        thumbnails: true,
        Events: undefined,
        btns: {}
    }, <fullscreenOptions>{
        menuBarFixed: true,
        opacity: 0.95,
        autoplay: false,
        autoplay_repeat: false,
        padding: '40px 0',
        //backgroundColor: '#222',
        slideInterval: 10000,
        thumbnails: true,
        Events: undefined,
        btns: {}
    }];

    // let configEvents: ConfigEvents = {
    //     onLoaded: () => { return <IGallery>[] }
    // };

    let cfg: Config = {
        window: window!,
        autoInit: true,
        defaultOptions: {
            lazyLoad: true,
            enableFullScreen: true
        },
        instances: []
    };

    cfg = Object.assign({}, cfg, userConfig || {});
    cfg.defaultOptions!.carousel = Object.assign({}, carouselOptions, cfg.defaultOptions!.carousel || {});
    cfg.defaultOptions!.fullscreen = Object.assign({}, fullscreenOptions, cfg.defaultOptions!.fullscreen || {});

    //cfg.document = await ready(cfg.document);
    if(!cfg.document) cfg.document = document;

    if (cfg.rootElement && typeof cfg.rootElement === 'string')
        cfg.rootElement = Find_Element(cfg.document, cfg.rootElement);
    if (!cfg.containerElement) cfg.containerElement = cfg.document.body;

    return cfg;
};