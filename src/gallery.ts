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

        let instances = this.find_galleries(config);
        this.setup(instances);
    }

    private find_external_images() {
        return Array.from(_PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.externalIncludeImage!) || []) as HTMLElement[];
    }

    private find_galleries(config: Config) {
        const instanceOptionsExist = config.instances && Array.isArray(config.instances) && config.instances.length > 0;

        let extMedia = this.find_external_images();

        let galleries: GalleryInstance[] = [];
        // options by javascript instances

        if (instanceOptionsExist) {
            galleries = config.instances!.map(instance => {
                if (typeof instance.container === _TYPES.string) {
                    instance.ContainerId = <string>instance.container;
                    instance.container = Find_Element(_PLATFORM.DOM, (<string>instance.container));
                }
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
            let groupedById: { key: string, media: HTMLElement[], options?: Options }[] = [];
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

            if (instanceOptionsExist)
                groupedById.forEach(group => {
                    let opts = config.instances!.find(e => e.ContainerId == `#${group.key}`);
                    if (opts)
                        group.options = opts.options;
                });


            if (groupedById.length > 0)
                Array.prototype.push.apply(galleries, groupedById.map(group => <GalleryInstance>{
                    ContainerId: group.key,
                    externalMedia: group.media,
                    options: group.options
                }));
        }

        galleries.forEach(g => g.options = deepObjectAssign(JSON.parse(JSON.stringify(_PLATFORM.defaultOptions)), g.options));

        console.log(galleries);
        console.log(extMedia);

        return galleries;
    }

    private get_autoinit_galleries(excludeContainers: HTMLElement[] = []): GalleryInstance[] {
        let galleries = (Array.from(_PLATFORM.DOM.getElementsByClassName(_CLASSNAMES.carouselContainer!) || []) as HTMLElement[])
            .filter(e => !excludeContainers.some(f => f === e));// .includes(e));

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

    private setup(instances?: GalleryInstance[]) {
        if (!instances || instances.length <= 0) return;

        this.galleries = instances.map(instance => {
            let gallery: IGallery = {
                Id: GalleryId++,
                options: instance.options,
                container: <HTMLElement>instance.container,
                media: instance.container ?
                    convertToMediaObjects(Array.from((<HTMLElement>instance.container).getElementsByClassName(_CLASSNAMES.item) || []) as HTMLElement[]) :
                    [],
                externalMedia: convertToMediaObjects(instance.externalMedia!.map(media => {
                    const removeFromDom = !!media.dataset[_DATA_SETS.external.removeFromDOM];
                    let element = removeFromDom ? media : media.cloneNode(true) as HTMLElement;
                    if (element.classList.contains(_CLASSNAMES.item))
                        return removeFromDom ? element : [element, media];

                    let wrapper = createElement({
                        elementTagOrElement: _HTML.Tags.li,
                        classes: _CLASSNAMES.item
                    });
                    wrapper.appendChild(element);

                    return removeFromDom ? wrapper : [wrapper, media];
                }))
            };

            instance.instance = gallery;

            return gallery;
        });

        this.galleries.forEach(gallery => {
            if (gallery.container) gallery.Carousel = new Carousel(gallery);
            if (gallery.options!.enableFullScreen || !gallery.container)
                gallery.Fullscreen = new Fullscreen(gallery);

            this.Attach_EventListeners(gallery);

        });

        //building dyamic stylesheet
        _PLATFORM.styleSheet.buildSheet();
    }

    private Attach_EventListeners(gallery: IGallery) {
        const imgCount = gallery.media.length;
        //gallery.container.addEventListener('click', (event) => gallery.Carousel!.togglePlay());
        //gallery.container.addEventListener('click', (event) => gallery.Fullscreen!.show(event));

        gallery.media.forEach((img, index) => {
            img.handler = () => {
                gallery.Fullscreen!.show(index);
            };
            img.element.addEventListener(_EVENT_ACTIONS.click, img.handler);
        });

        gallery.externalMedia.filter(img => img.origin).forEach((img, index) => {
            img.handler = () => {
                gallery.Fullscreen!.show(imgCount + index);
            };
            img.origin!.addEventListener(_EVENT_ACTIONS.click, img.handler);


            // img.origin!.addEventListener(_EVENT_ACTIONS.click, (event) => {
            //     gallery.Fullscreen!.show(imgCount + index);
            // });
        });
    }

    private Detach_EventListeners(gallery: IGallery) {
        //gallery.container.removeEventListener('click', (event) => gallery.Carousel!.togglePlay());
    }

    //clickEL()

    public dispose() {


        this.galleries.forEach(gallery => {
            if (gallery.media) gallery.media.forEach(m => m.element.removeEventListener(_EVENT_ACTIONS.click, m.handler));
            if (gallery.externalMedia) gallery.externalMedia.filter(e => e.origin)
                .forEach(m => m.origin!.removeEventListener(_EVENT_ACTIONS.click, m.handler));
            if (gallery.Carousel) gallery.Carousel.dispose();
            if (gallery.Fullscreen) gallery.Fullscreen.dispose();
            _PLATFORM.overlay.dispose();
        });
        this.galleries = [];
        GalleryId = 1;
    }

}