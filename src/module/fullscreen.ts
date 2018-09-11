import { Media, ICgElement } from './../interfaces';
import { _CLASSNAMES, _EVENT_ACTIONS, _TYPES, _HTML } from './../constants';
import { CgElement, convertToMediaObjects } from './../dom/utils';
//import { MenuBar } from './../dom/menu-bar';
import { Carousel } from './carousel';
import { _PLATFORM } from './../platform';
import { IGallery, Options, IMedia } from '../interfaces';

export class Fullscreen {
    private readonly gallery: IGallery;
    private readonly images: IMedia[];
    private readonly carousel: Carousel;
    private readonly menubar: CgElement;
    private element?: CgElement;
    private carouselContainer?: CgElement;
    private options: Options;
    private titleElement?: CgElement;

    private overlayStyleClass?: string;

    constructor(gallery: IGallery) {
        this.gallery = gallery;

        let opts = JSON.parse(JSON.stringify(this.gallery.options!)) as Options;
        opts.carousel = opts.fullscreen;
        this.options = opts;
        this.menubar = this.createMenuBar();
        this.createContainerElements();

        this.images = this.gallery.media.concat(this.gallery.externalMedia).map(media => {
            return <IMedia>{
                element: media.element.cloneNode(true),
                type: media.type,
                title: media.title,
                description: media.description
            };
        });
        //  this.gallery.media.concat(convertToMediaObjects(this.gallery.externalMedia.map(node => 
        //     node.element.cloneNode(true) as HTMLElement)));

        this.carousel = new Carousel(<IGallery>{
            media: this.images,
            container: this.element!.Element,
            options: opts
        }, this);

        if (this.options.fullscreen!.backgroundColor)
            this.overlayStyleClass = _PLATFORM.styleSheet.appendStyle({ values: [['background', this.options.fullscreen!.backgroundColor!]] });
    }

    createContainerElements() {
        this.carouselContainer = new CgElement({ classes: _CLASSNAMES.carousel });
        this.element = new CgElement({ classes: `${_CLASSNAMES.fullscreenContainer} ${this.options.carousel!.thumbnails ? _CLASSNAMES.thumbsActive : ''}` });
        this.element.appendChild(this.menubar);
        this.element.appendChild(this.carouselContainer);
    }

    show(index: number) {
        this.setMenubarFixed(this.gallery.options!.fullscreen!.menuBarFixed!);
        if (index) this.carousel.set_active(index);

        _PLATFORM.overlay.show(this.element!.Element, this.overlayStyleClass);
    }

    dispose() {
        this.carousel.dispose();
        this.menubar.dispose();
        this.element!.dispose();
    }

    setThumbnailsActiveState(value?: boolean) {
        let thumbnails = this.carousel.Thumbnails!;
        // if(typeof value === _TYPES.boolean)
        thumbnails.toggle();
        if (thumbnails.isActive)
            this.element!.Element.classList.add(_CLASSNAMES.thumbsActive);
        else
            this.element!.Element.classList.remove(_CLASSNAMES.thumbsActive);
    }

    createMenuBar() {
        this.titleElement = new CgElement({
            classes: _CLASSNAMES.fullscreenMenuBarTitle, textContent: '',
            styles: this.options.fullscreen!.color ? { values: [['color', this.options.fullscreen!.color!]] } : undefined
        });
        return new CgElement({
            classes: _CLASSNAMES.fullscreenMenuBar, children: [
                this.titleElement,
                {
                    tagName: _HTML.Tags.ul, classes: _CLASSNAMES.fullscreenMenuBarBtnGroup, children: [
                        // BUTTONS:
                        // {
                        //     tagName: _HTML.Tags.li, classes: _CLASSNAMES.fullscreenMenuBarBtn, eventListeners: [{
                        //         action: _EVENT_ACTIONS.click, handler: (event) => { this.setThumbnailsActiveState(); }
                        //     }], children: [{ tagName: _HTML.Tags.i, classes: _CLASSNAMES.iconTiles }]
                        // },
                        {
                            tagName: _HTML.Tags.li, classes: _CLASSNAMES.fullscreenMenuBarBtn, eventListeners: [{
                                action: _EVENT_ACTIONS.click, handler: (event) => { this.setThumbnailsActiveState(); }
                            }], styles: this.options.fullscreen!.btns!.background ? { values: [['color', this.options.fullscreen!.btns!.background!]] } : undefined,
                            children: [{
                                tagName: _HTML.Tags.i, classes: _CLASSNAMES.iconThumbnails,
                                styles: this.options.fullscreen!.color ? {
                                    values: [['border-color', this.options.fullscreen!.color]]
                                } : undefined
                            }]
                        },
                        {
                            tagName: _HTML.Tags.li, classes: _CLASSNAMES.fullscreenMenuBarBtn, eventListeners: [{
                                action: _EVENT_ACTIONS.click, handler: (event) => { _PLATFORM.overlay.close(); }
                            }], children: [{
                                tagName: _HTML.Tags.i, classes: _CLASSNAMES.iconClose,
                                styles: this.options.fullscreen!.color ? {
                                    //values: [['background-color', this.options.fullscreen!.color!]],
                                    childValues: [{
                                        id: [':before', ':after'],
                                        values: [['background-color', this.options.fullscreen!.color!]]
                                    }]
                                } : undefined
                            }]
                        }
                    ]
                }
            ]
        });
    }

    setMenubarFixed(value: boolean) {
        if (value) {

            this.menubar.Element.classList.add(_CLASSNAMES.fixed);
        }
        else {
            this.menubar.Element.classList.remove(_CLASSNAMES.fixed);
        }
    }

    public setMediaInfo(media: IMedia, index: number, length: number) {
        console.log(`${index}/${length}`, media);
        this.titleElement!.Element.innerText = media.title == undefined ? '' : media.title;
    }

}