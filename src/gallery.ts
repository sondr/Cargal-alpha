import { Fullscreen } from './module/fullscreen';
import { _CLASSNAMES, _EVENT_ACTIONS, _HTML } from './constants';
import { Find_Element } from './config';
import { Carousel } from './module/carousel';
import { PLATFORM, _PLATFORM } from './platform';
import { createElement } from './dom/utils';
import { IGallery, Config } from './interfaces';

export class Gallery {

    private galleries: IGallery[] = [];

    constructor(config: Config) {
        PLATFORM.create(config.document, config.window, config.containerElement as HTMLElement, config.options!);
        
        this.find_DOM_galleries(config);
        this.setup();
    }

    private find_DOM_galleries(config: Config) {
        let domGals = _PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.carouselContainer!);
        let externalImg = Array.from(_PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.externalIncludeImage!)) as HTMLDivElement[];

        for (let i = 0; i < domGals.length; i++) {
            let container = domGals.item(i) as HTMLElement;
            let externalMedia: HTMLDivElement[] = [];

            let opts = Object.assign({}, _PLATFORM.defaultOptions);
            if (container.id) {
                opts.Id = container.id
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
                container: Find_Element(container, `.${_CLASSNAMES.carouselOuter}`)!,
                media: Array.from(container.getElementsByClassName(_CLASSNAMES.item)) as HTMLDivElement[],
                externalMedia: externalMedia
            });
        }
    }

    private setup() {
        this.galleries.forEach(gallery => {
            this.Attach_EventListeners(gallery);

            gallery.Carousel = new Carousel(gallery);
            gallery.Fullscreen = new Fullscreen(gallery);
        });
    }

    private Attach_EventListeners(gallery: IGallery) {
        const imgCount = gallery.media.length;
        //gallery.container.addEventListener('click', (event) => gallery.Carousel!.togglePlay());
        //gallery.container.addEventListener('click', (event) => gallery.Fullscreen!.show(event));

        gallery.media.forEach((img, index) => img.addEventListener(_EVENT_ACTIONS.click, (event) => gallery.Fullscreen!.show(index)));
        gallery.externalMedia.forEach((img, index) => img.addEventListener(_EVENT_ACTIONS.click, (event) => gallery.Fullscreen!.show(imgCount + index)));
    }

    private Detach_EventListeners(gallery: IGallery) {
        //gallery.container.removeEventListener('click', (event) => gallery.Carousel!.togglePlay());
    }

}