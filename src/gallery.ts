import { Fullscreen } from './module/fullscreen';
import { _CLASSNAMES, _EVENT_ACTIONS, _HTML, _TYPES, _DATA_SETS } from './constants';
import { Carousel } from './module/carousel';
import { PLATFORM, _PLATFORM } from './platform';
import { createElement, convertToMediaObjects, Find_Element, deepObjectAssign } from './dom/utils';
import { IGallery, Config, IMedia, Options, GalleryInstance } from './interfaces';

let GalleryId: number = 1;

export class Gallery {

    private galleries: IGallery[] = [];

    constructor(config: Config) {
        PLATFORM.create(config.document, config.window, config.containerElement as HTMLElement, config.defaultOptions!);

        console.log("find galleries: ");
        let instances = this.find_galleries(config);
        this.setup(instances);
        console.log("find galleries end");

        // if (config.autoInit)
        //     this.find_DOM_galleries(config);
        this.setup();
    }

    private find_external_images() {
        return Array.from(_PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.externalIncludeImage!) || []) as HTMLElement[];
    }

    private find_galleries(config: Config) {
        let extMedia = this.find_external_images();
        console.log(extMedia);

        let galleries: GalleryInstance[] = [];
        // options by javascript instances
        if (config.instances && Array.isArray(config.instances)) {
            galleries = config.instances!.map(instance => {
                if (typeof instance.container === _TYPES.string) instance.container = Find_Element(_PLATFORM.DOM, (<string>instance.container));
                return instance;
            }).filter(e => e.container);
        }

        if (config.autoInit)
            Array.prototype.push.apply(galleries, this.get_autoinit_galleries(galleries.map(g => <HTMLElement>g.container)));

        // Attach ExternalMedia
        galleries.forEach(g => {
            g.externalMedia = [];
            if ((<HTMLElement>g.container).id) g.ContainerId = (<HTMLElement>g.container).id;

            if (g.ContainerId) {
                for (let i = extMedia.length - 1; i >= 0; i--) {
                    let externalId = extMedia[i].dataset[_DATA_SETS.external.include];
                    if (externalId != g.ContainerId) continue;
                    g.externalMedia!.unshift(extMedia.splice(i, 1)[0]);
                }
            }
        });

        // Rest of external media push to gallery
        if (extMedia.length > 0) {
            console.log("still media");
            let groupedById: { key: string, media: HTMLElement[] }[] = [];
            //let groupedById: any = {};
            extMedia.forEach(media => {
                let id = media.dataset[_DATA_SETS.external.include];
                if (!id) return;
                let group = groupedById.find(e => e.key == id);
                if (group) group.media.push(media);
                else groupedById.push({
                    key: id,
                    media: [media]
                });
            });
            if (groupedById.length > 0)
                Array.prototype.push.apply(galleries, groupedById.map(group => <GalleryInstance>{
                    ContainerId: group.key,
                    externalMedia: group.media
                }));
        }

        galleries.forEach(g => g.options = deepObjectAssign(JSON.parse(JSON.stringify(_PLATFORM.defaultOptions)), g.options));

        console.log(galleries);
        console.log(extMedia);

        return galleries;
    }

    private get_autoinit_galleries(excludeContainers: HTMLElement[] = []): GalleryInstance[] {
        let galleries = (Array.from(_PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.carouselContainer!) || []) as HTMLElement[])
            .filter(e => !excludeContainers.includes(e));

        console.log("autoinitGals: ", galleries);

        return galleries.map(containerElement => {
            return <GalleryInstance>{
                container: containerElement,
                //options: JSON.parse(JSON.stringify(_PLATFORM.defaultOptions))
            }
        });
    }

    private get_dataset_options(containerElement: HTMLElement): Options {
        let opts: Options = {
            enableFullScreen: false
        };

        return opts;
    }

    private find_DOM_galleries(config: Config) {

        let domGalleries = _PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.carouselContainer!);
        let externalImg = Array.from(_PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.externalIncludeImage!) || []) as HTMLDivElement[];

        for (let i = 0; i < domGalleries.length; i++) {
            let container = domGalleries.item(i) as HTMLElement;
            let externalMedia: HTMLDivElement[] = [];

            let opts = Object.assign({}, _PLATFORM.defaultOptions);
            if (container.id) {
                opts.Id = container.id;
                externalMedia = externalImg.filter(e => e.dataset.cgGalleryId == opts.Id).map(e => {
                    let el = e.cloneNode(true);
                    let wrapper = createElement(_HTML.Tags.div, _CLASSNAMES.item) as HTMLDivElement;
                    wrapper.appendChild(el);

                    return wrapper;
                });
            } else
                opts.Id = `cg-id-${i}`;

            this.galleries.push({
                Id: GalleryId++,
                options: opts,
                //container: Find_Element(container, `.${_CLASSNAMES.carouselOuter}`)!,
                container: container,
                media: convertToMediaObjects(Array.from(container.getElementsByClassName(_CLASSNAMES.item) || []) as HTMLElement[]),
                externalMedia: convertToMediaObjects(externalMedia)
            });
        }
    }

    private setup(instances?: GalleryInstance[]) {
        if (!instances || instances.length <= 0) return;

        this.galleries = instances.map(instance => <IGallery>{
            Id: GalleryId++,
            options: instance.options,
            container: instance.container,
            media: instance.container ?
                convertToMediaObjects(Array.from((<HTMLElement>instance.container).getElementsByClassName(_CLASSNAMES.item) || []) as HTMLElement[]) :
                [],
            externalMedia: convertToMediaObjects(instance.externalMedia!.map(media => {
                const removeFromDom = !!media.dataset[_DATA_SETS.external.removeFromDOM];
                let element = removeFromDom ? media : media.cloneNode(true) as HTMLElement;
                if (element.classList.contains(_CLASSNAMES.item)) return element;

                let wrapper = createElement(_HTML.Tags.div, _CLASSNAMES.item);
                wrapper.appendChild(element);

                return [wrapper, element];
            }))
        });

        console.log(this.galleries);

        this.galleries.forEach(gallery => {
            this.Attach_EventListeners(gallery);

            if(gallery.container) gallery.Carousel = new Carousel(gallery);
            if (gallery.options!.enableFullScreen || !gallery.container)
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

        gallery.externalMedia.filter(img => img.origin).forEach((img, index) =>
            img.origin!.addEventListener(_EVENT_ACTIONS.click, (event) =>{
                console.log("externalMedia Origin: ", img);
                gallery.Fullscreen!.show(imgCount + index);
            }));
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