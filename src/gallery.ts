import { Fullscreen } from './module/fullscreen';
import { _CLASSNAMES } from './constants';
import { Config, Options, Find_Element } from './config';
import { Carousel } from './module/carousel';
import { PLATFORM, _PLATFORM } from './platform';
import { createElement } from './dom/utils';

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

            console.log(container.dataset);
            let opts = Object.assign({}, _PLATFORM.defaultOptions);
            if (container.id) {
                opts.Id = container.id
                externalMedia = externalImg.filter(e => e.dataset.nygInclude == opts.Id).map(e => {
                    let el = e.cloneNode(true);
                    let wrapper = createElement('div', 'item') as HTMLDivElement;
                    wrapper.appendChild(el);
                    
                    return wrapper;
                });
            } else
                opts.Id = `nyg-id-${i}`;

            this.galleries.push({
                options: opts,
                container: Find_Element(container, `.${_CLASSNAMES.carouselOuter}`)!,
                media: Array.from(container.getElementsByClassName('item')) as HTMLDivElement[],
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

        gallery.media.forEach((img, index) => img.addEventListener('click', (event) => gallery.Fullscreen!.show(index)));
        gallery.externalMedia.forEach((img, index) => img.addEventListener('click', (event) => gallery.Fullscreen!.show(imgCount + index)));
    }

    private Detach_EventListeners(gallery: IGallery) {
        //gallery.container.removeEventListener('click', (event) => gallery.Carousel!.togglePlay());
    }

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