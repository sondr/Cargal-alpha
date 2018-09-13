import { Config, fullscreenOptions, CarouselOptions } from './interfaces';
import { Find_Element, deepObjectAssign } from './dom/utils';

//export async function Configure(userConfig?: Config): Promise<Config> {
export function Configure(userConfig?: Config): Config {

    // let configEvents: ConfigEvents = {
    //     onLoaded: () => { return <IGallery>[] }
    // };

    let cfg: Config = {
        //window: window!,
        autoInit: true,
        defaultOptions: {
            lazyLoad: true,
            enableFullScreen: true,
            Carousel: {
                autoplay: true,
                autoplay_repeat: true,
                backgroundColor: '#FFFFFF',
                //opacity: undefined,
                slideInterval: 10000,
                thumbnails: true,
                Events: undefined,
                btns: {}
            },
            Fullscreen: {
                //menuBarFixed: true,
                opacity: 0.95,
                Menubar:{
                    fixed: true,
                    indicator: true
                },
                title:{},
                description: {},
                Carousel: {
                    autoplay: false,
                    autoplay_repeat: false,
                    //padding: '40px 0',
                    padding: '0 0',
                    //backgroundColor: '#222',
                    slideInterval: 10000,
                    thumbnails: true,
                    Events: undefined,
                    btns: {}
                },
                btns: {}
            }
        },
        instances: []
    };

    cfg = deepObjectAssign({}, cfg, userConfig || {});
    cfg.window = window;

    //cfg.document = await ready(cfg.document);
    if (!cfg.document) cfg.document = document;

    if (cfg.rootElement && typeof cfg.rootElement === 'string')
        cfg.rootElement = Find_Element(cfg.document, cfg.rootElement);
    if (!cfg.containerElement) cfg.containerElement = cfg.document.body;

    return cfg;
};