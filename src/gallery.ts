import { Fullscreen } from './module/fullscreen';
import { _CLASSNAMES, _EVENT_ACTIONS, _HTML, _TYPES } from './constants';
import { Carousel } from './module/carousel';
import { PLATFORM, _PLATFORM } from './platform';
import { createElement, convertToMediaObjects, Find_Element } from './dom/utils';
import { IGallery, Config, IMedia, Options, GalleryInstance } from './interfaces';

export class Gallery {

    private galleries: IGallery[] = [];

    constructor(config: Config) {
        PLATFORM.create(config.document, config.window, config.containerElement as HTMLElement, config.defaultOptions!);

        if (config.autoInit)
            this.find_DOM_galleries(config);
        this.setup();
    }

    private find_external_images() {
        return Array.from(_PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.externalIncludeImage!)) as HTMLDivElement[];
    }

    private find_galleries(config: Config) {
        let externals = this.find_external_images();

        let galleries: GalleryInstance[] = [];
        // options by javascript instances
        if (!(config.instances || Array.isArray(config.instances)))
            galleries = config.instances!.map(instance => {
                if (instance.container === 'string') instance.container = Find_Element(_PLATFORM.DOM, instance.container);
                return instance;
            }).filter(e => e.container);

        if (config.autoInit)
            galleries.concat(this.get_autoinit_galleries(galleries.map(g => <HTMLElement>g.container)));

    }

    private get_autoinit_galleries(excludeContainers: HTMLElement[] = []): GalleryInstance[] {
        let galleries = (Array.from(_PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.carouselContainer!)) as HTMLElement[])
            .filter(e => !excludeContainers.includes(e));

        return galleries.map(containerElement => {
            return <GalleryInstance>{
                container: containerElement,
                options: JSON.parse(JSON.stringify(_PLATFORM.defaultOptions))
            }
        });
    }

    private get_dataset_options(containerElement: HTMLElement): Options {
        const datasets: string[] = [];
        let opts: Options = {
            enableFullScreen: false
        };

        return opts;
    }

    private find_DOM_galleries(config: Config) {

        let domGalleries = _PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.carouselContainer!);
        let externalImg = Array.from(_PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.externalIncludeImage!)) as HTMLDivElement[];

        for (let i = 0; i < domGalleries.length; i++) {
            let container = domGalleries.item(i) as HTMLElement;
            let externalMedia: HTMLDivElement[] = [];

            let opts = Object.assign({}, _PLATFORM.defaultOptions);
            if (container.id) {
                opts.Id = container.id;
                externalMedia = externalImg.filter(e => e.dataset.cgInclude == opts.Id).map(e => {
                    let el = e.cloneNode(true);
                    let wrapper = createElement(_HTML.Tags.div, _CLASSNAMES.item) as HTMLDivElement;
                    wrapper.appendChild(el);

                    return wrapper;
                });
            } else
                opts.Id = `cg-id-${i}`;

            this.galleries.push({
                options: opts,
                //container: Find_Element(container, `.${_CLASSNAMES.carouselOuter}`)!,
                container: container,
                media: convertToMediaObjects(Array.from(container.getElementsByClassName(_CLASSNAMES.item)) as HTMLElement[]),
                externalMedia: convertToMediaObjects(externalMedia)
            });
        }
    }

    private setup() {
        this.galleries.forEach(gallery => {
            this.Attach_EventListeners(gallery);

            gallery.Carousel = new Carousel(gallery);
            if (gallery.options!.enableFullScreen)
                gallery.Fullscreen = new Fullscreen(gallery);
        });
    }

    private Attach_EventListeners(gallery: IGallery) {
        const imgCount = gallery.media.length;
        //gallery.container.addEventListener('click', (event) => gallery.Carousel!.togglePlay());
        //gallery.container.addEventListener('click', (event) => gallery.Fullscreen!.show(event));

        gallery.media.forEach((img, index) =>
            img.element.addEventListener(_EVENT_ACTIONS.click, (event) =>
                gallery.Fullscreen!.show(index)));

        gallery.externalMedia.forEach((img, index) =>
            img.element.addEventListener(_EVENT_ACTIONS.click, (event) =>
                gallery.Fullscreen!.show(imgCount + index)));
    }

    private Detach_EventListeners(gallery: IGallery) {
        //gallery.container.removeEventListener('click', (event) => gallery.Carousel!.togglePlay());
    }

    public dispose() {
        this.galleries.forEach(gallery => {
            if (gallery.Carousel) gallery.Carousel.dispose();
            if (gallery.Fullscreen) gallery.Fullscreen.dispose();
            _PLATFORM.overlay.dispose();
        });
    }

}